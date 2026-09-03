import { useState } from "react";
import type { AdminApplicationI } from "@/features/dashboard/data/dashboard-data";

const applicationsPerPage = 10;

const useJobDetail = ({ applications }: { applications: AdminApplicationI[] }) => {
  const [page, setPage] = useState(1);
  const totalPages = Math.max(1, Math.ceil(applications.length / applicationsPerPage));
  const visibleApplications = applications.slice(
    (page - 1) * applicationsPerPage,
    page * applicationsPerPage,
  );

  return {
    applicationsPerPage,
    page,
    setPage,
    totalPages,
    visibleApplications,
  };
};

export default useJobDetail;
