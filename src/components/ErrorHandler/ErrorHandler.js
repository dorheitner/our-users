/** @format */

import { message } from "antd";
import { useRecoilState } from "recoil";
import isEmpty from "lodash.isempty";

import { ErrorState } from "../../store/atons";

export default function ErrorHandler({ errors, resetErrorBoundary }) {
  const [error] = useRecoilState(ErrorState);

  if (!isEmpty(error)) {
    message.error(error.message);
  }
}
