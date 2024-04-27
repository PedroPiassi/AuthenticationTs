import _ from "lodash";
import moment from "moment";
import { FormikProps } from "formik";

interface FormikFieldProps {
  name: string;
  value: any;
  onChange: (event: any) => void;
  onBlur: FormikProps<any>["handleBlur"];
  error: boolean;
  helperText?: string | JSX.Element | null; // Pode ser uma string, elemento JSX ou null
}

export const formikProps = (
  field: string,
  formik: FormikProps<any>
): FormikFieldProps => ({
  name: field,
  value: getValue(field, formik),
  onChange: (event: any) => {
    // Forçar set touched para validações
    const touched = formik.touched;
    _.set(touched, field, true);
    formik.setTouched(touched);

    // Verifica o tipo do event e seta o valor no formik
    switch (true) {
      case event instanceof moment:
      case typeof event === "string":
        formik.setFieldValue(field, event);
        return;
      case event.nativeEvent instanceof Event:
      case event instanceof PointerEvent:
      case event instanceof KeyboardEvent:
        formik.setFieldValue(field, event.target.value);
        return;
      default:
        console.warn(
          `formikProps não está preparado para lidar com esse tipo de evento. (${event.constructor.name})`
        );
    }
  },
  onBlur: formik.handleBlur,
  error: getTouched(field, formik) && Boolean(getErrors(field, formik)),
  helperText: getTouched(field, formik) ? getErrors(field, formik) : null,
});

export const getValue = (fieldName: string, formik: FormikProps<any>): any =>
  _.get(formik.values, fieldName) ?? "";
const getTouched = (fieldName: string, formik: FormikProps<any>): boolean =>
  Boolean(_.get(formik.touched, fieldName));
export const getErrors = (
  fieldName: string,
  formik: FormikProps<any>
): string | undefined => _.get(formik.errors, fieldName);
