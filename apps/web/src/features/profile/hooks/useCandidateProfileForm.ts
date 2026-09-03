import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import toast from "react-hot-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { candidateProfileSchema, type CandidateProfileInputI } from "@job-portal/contracts";
import { getApiErrorMessage } from "@/services/api-error";
import type { CandidateProfileFormModeI, CandidateProfileFormValuesI } from "@/types/profile";
import { useGetCandidateProfileQuery, useSaveCandidateProfileMutation } from "../store/profile-api";

const defaultValues: CandidateProfileFormValuesI = {
  phone: "",
  education: "",
  yearsOfExperience: 0,
  currentCompany: "",
  currentRole: "",
  expectedSalary: 0,
  noticePeriodDays: 0,
  skills: [],
};

type UseCandidateProfileFormOptionsI = {
  mode?: CandidateProfileFormModeI;
  onCancel?: () => void;
  onSubmit?: (values: CandidateProfileInputI) => Promise<void> | void;
};

export const useCandidateProfileForm = ({
  mode = "edit",
  onCancel,
  onSubmit: externalOnSubmit,
}: UseCandidateProfileFormOptionsI = {}) => {
  const [submitError, setSubmitError] = useState<string>();
  const [saveCandidateProfile, { isLoading }] = useSaveCandidateProfileMutation();

  const candidateProfileQuery = useGetCandidateProfileQuery(undefined, {
    skip: mode === "create",
  });
  const candidateProfile = candidateProfileQuery.data?.data;

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<CandidateProfileFormValuesI, unknown, CandidateProfileInputI>({
    defaultValues,
    resolver: zodResolver(candidateProfileSchema),
  });

  const navigate = useNavigate();

  const onBack = () => {
    if (onCancel) {
      onCancel();
      return;
    }

    if (mode === "create") {
      navigate("/");
    } else {
      navigate("/listing");
    }
  };

  const handleProfileSubmit = async (values: CandidateProfileInputI) => {
    try {
      setSubmitError(undefined);
      if (externalOnSubmit) {
        await externalOnSubmit(values);
      } else {
        await saveCandidateProfile(values).unwrap();
        toast.success(mode === "create" ? "Profile created!" : "Profile updated!");
        navigate("/listing", { replace: true });
      }
    } catch (error) {
      setSubmitError(
        getApiErrorMessage(error, "Failed to save profile. Check your details and try again."),
      );
    }
  };

  useEffect(() => {
    if (mode === "edit" && candidateProfile) {
      setValue("phone", candidateProfile.phone ?? "");
      setValue("education", candidateProfile.education ?? "");
      setValue("yearsOfExperience", candidateProfile.yearsOfExperience ?? 0);
      setValue("currentCompany", candidateProfile.currentCompany ?? "");
      setValue("currentRole", candidateProfile.currentRole ?? "");
      setValue("expectedSalary", candidateProfile.expectedSalary ?? 0);
      setValue("noticePeriodDays", candidateProfile.noticePeriodDays ?? 0);
      setValue("skills", candidateProfile.skills ? [...candidateProfile.skills] : []);
    }
  }, [mode, candidateProfile, setValue]);

  return {
    control,
    errors,
    handleProfileSubmit,
    handleSubmit,
    isSubmitting: isLoading,
    onBack,
    register,
    submitError,
  };
};

export default useCandidateProfileForm;
