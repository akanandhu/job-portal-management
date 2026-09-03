import type { CandidateProfileFormValuesI } from "@/types/profile";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  candidateProfileSchema,
  type CandidateProfileInputI,
} from "@job-portal/contracts";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";

const defaultValues: CandidateProfileFormValuesI = {
  phone: "",
  education: "",
  yearsOfExperience: 0,
  currentCompany: null,
  currentRole: null,
  expectedSalary: 0,
  noticePeriodDays: 0,
  skills: [],
};

const emptyToNull = (value: unknown) => {
  const trimmedValue = String(value).trim();
  return trimmedValue ? trimmedValue : null;
};

const useCandidateProfileForm = ({
  initialValues,
  onCancel,
  onSubmit,
}: {
  initialValues?: CandidateProfileFormValuesI;
  onCancel?: () => void;
  onSubmit?: (values: CandidateProfileInputI) => void;
}) => {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<CandidateProfileFormValuesI, unknown, CandidateProfileInputI>({
    defaultValues: initialValues ?? defaultValues,
    resolver: zodResolver(candidateProfileSchema),
  });

  const navigate = useNavigate();

  const handleProfileSubmit = (values: CandidateProfileInputI) => {
    onSubmit?.(values);
  };

  const onBack = () => {
    if (onCancel) {
      onCancel();
      return;
    }

    navigate("/register");
  };

  return {
    register,
    control,
    handleSubmit,
    errors,
    handleProfileSubmit,
    onBack,
    emptyToNull
  };
};

export default useCandidateProfileForm;
