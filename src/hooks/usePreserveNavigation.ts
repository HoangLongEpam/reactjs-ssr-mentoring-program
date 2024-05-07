import {
  createSearchParams,
  useNavigate,
  useSearchParams,
} from "react-router-dom";

export const usePreserveNavigation = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const preserveNavigate = (pathName: string) => {
    navigate({
      pathname: pathName,
      search: createSearchParams(Object.fromEntries(searchParams)).toString(),
    });
  };

  return {
    preserveNavigate,
  };
};
