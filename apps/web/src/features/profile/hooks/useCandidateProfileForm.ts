import type { CandidateProfileFormValuesI } from "@/types/profile";
import { zodResolver } from "@hookform/resolvers/zod";
import { candidateProfileSchema, type CandidateProfileInputI } from "@job-portal/contracts";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";

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

const getFormValues = (
  initialValues: CandidateProfileFormValuesI | undefined,
): CandidateProfileFormValuesI => {
  if (!initialValues) {
    return defaultValues;
  }

  return {
    ...initialValues,
    currentCompany: initialValues.currentCompany ?? "",
    currentRole: initialValues.currentRole ?? "",
  };
};

const useCandidateProfileForm = ({
  initialValues,
  onCancel,
  onSubmit,
}: {
  initialValues?: CandidateProfileFormValuesI;
  onCancel?: () => void;
  onSubmit?: (values: CandidateProfileInputI) => Promise<void> | void;
}) => {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<CandidateProfileFormValuesI, unknown, CandidateProfileInputI>({
    defaultValues: getFormValues(initialValues),
    resolver: zodResolver(candidateProfileSchema),
  });

  const navigate = useNavigate();

  const handleProfileSubmit = async (values: CandidateProfileInputI) => {
    await onSubmit?.(values);
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
  };
};

export default useCandidateProfileForm;
