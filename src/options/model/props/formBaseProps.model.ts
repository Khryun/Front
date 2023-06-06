import { ReactNode } from "react";
import { FormInstance } from "antd";


export interface FormBaseProps {
  form: FormInstance<any>,
  title?: string, 
  onFinish: (values: any) => void,
  onFinishFailed?: (values: any) => void,
  children?: ReactNode,
}