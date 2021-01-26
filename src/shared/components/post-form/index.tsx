import {
  Input, Form, DatePicker, Button, Radio, TimePicker, Switch,
} from "antd";
import {
  Field, Formik, Form as FormikForm, FieldProps,
} from "formik";
// import Form from "antd/lib/form/Form";
import React from "react";
import * as Yup from "yup";
import moment, { Moment } from "moment";
import isEmpty from "lodash.isempty";
import {
  CloseOutlined, DeleteFilled, FacebookFilled,
  InstagramFilled,
  MailFilled, SaveOutlined, TwitterSquareFilled,
} from "@ant-design/icons";
import ResponsiveFormRow from "./responsive-form-row";
import FieldLabel from "./field-label";

interface PostFormProps {
    sections: any[];
    onFetch?: ()=>Promise<any>;
    onSave?: (values: any)=>Promise<any>;
    onCancel?: (values: any)=>Promise<any>;
    onSubmit?: (values: any)=>Promise<any>;
    onDelete?: (values: any)=>Promise<any>;

}

const FormSchema = Yup.object().shape({
  slug: Yup.string().required("required"),
  story_url: Yup.string().required("Field cannot be empty!").url("Not a valid url! (Hint: Make sure to include http)"),
  post_facebook: Yup.string(),
  post_twitter: Yup.string().max(200, "Cannot exceed 200 characters!"),
  post_newsletter: Yup.string(),
  post_notes: Yup.string(),
  post_instagram: Yup.string(),
  post_date: Yup.string().required("required")
    .test("checkDate", "Cannot select a date earlier than today!", (value) => {
      const dateMoment = moment(value, "MM-DD-YYYY");
      const nowMoment = moment(moment().format("MM-DD-YYYY"), "MM-DD-YYYY");
      if (dateMoment.unix() >= nowMoment.unix()) {
        return true;
      }
      return false;
    }),

  pub_ready_online: Yup.bool(),
  pub_ready_copy: Yup.bool(),
  pub_time: Yup.string().required("required"),
  section: Yup.number().nullable().required("value is not provided"),

});

const PostForm: React.FC<PostFormProps> = (props) => {
  const {
    sections, onFetch, onCancel, onDelete, onSave, onSubmit,
  } = props;

  return (
    <Formik
      initialValues={{
        slug: "",
        story_url: "",
        post_date: "",
        pub_time: "",
        section: null,
        post_facebook: "",
        post_twitter: "",
        post_newsletter: "",
        post_notes: "",
        post_instagram: "",
        pub_ready_copy: false,
        pub_ready_online: false,
      }}
      validationSchema={FormSchema}
      onSubmit={(values: any) => {
        console.log(values);
      }}
    >
      {({ errors, touched, values }) => (

        <FormikForm action="test" className="ant-form ant-form-horizontal">

          <Field
            name="slug"
          >
            {({ field, form }: any) => {
              return (
                <Form.Item
                  style={{
                    display: "block",
                  }}
                  label={<FieldLabel text="Slug" />}
                  validateStatus={form.errors.slug && form.touched.slug ? "error" : ""}
                  help={form.errors.slug && touched.slug ? form.errors.slug : null}
                >
                  <Input
                    id="slug"
                    placeholder="Type slug here"
                    onChange={field.onChange}
                    onBlur={field.onBlur}
                  />
                </Form.Item>
              );
            }}
          </Field>
          <Field
            name="story_url"
          >
            {({ field, form }: any) => {
              return (
                <Form.Item
                  style={{
                    display: "block",
                  }}
                  label={<FieldLabel text="Url" />}
                  validateStatus={form.errors.story_url && form.touched.story_url ? "error" : ""}
                  help={form.errors.story_url && touched.story_url ? form.errors.story_url : null}
                >
                  <Input
                    placeholder="https://dailybruin.com/..."
                    id="story_url"
                    onChange={field.onChange}
                    onBlur={field.onBlur}
                  />
                </Form.Item>
              );
            }}
          </Field>
          <ResponsiveFormRow>
            <Field
              name="post_date"
            >
              {({ field, form }: FieldProps) => {
                return (
                  <Form.Item
                    label={<FieldLabel text="Post date" />}
                    validateStatus={form.errors.post_date && form.touched.post_date ? "error" : ""}
                    help={form.errors.post_date && touched.post_date ? form.errors.post_date : null}
                  >
                    <DatePicker
                      id="post_date"
                      onChange={(date: Moment|null, dateString: string) => {
                        form.setFieldValue("post_date", dateString, true);
                      }}
                      format="MM-DD-YYYY"
                      onBlur={field.onBlur}
                    />
                  </Form.Item>
                );
              }}
            </Field>
            <Field
              name="pub_time"
            >
              {({ field, form }: FieldProps) => {
                return (
                  <Form.Item
                    label={<FieldLabel text="Post time" />}
                    validateStatus={form.errors.pub_time && form.touched.pub_time ? "error" : ""}
                    help={form.errors.pub_time && touched.pub_time ? form.errors.pub_time : null}
                  >
                    <TimePicker
                      use12Hours
                      format="h:mm a"
                      id="pub_time"
                      onChange={(x, timeString) => {
                        form.setFieldValue("pub_time", moment(timeString, "LT").format("HH:mm:ss"));
                      }}
                      onBlur={field.onBlur}
                    />
                  </Form.Item>
                );
              }}
            </Field>
          </ResponsiveFormRow>
          <Field
            name="section"
          >
            {({ field, form }: FieldProps) => {
              return (
                <Form.Item
                  label={<FieldLabel text="Sections" />}
                  validateStatus={form.errors.section && form.touched.section ? "error" : ""}
                  help={form.errors.section && touched.section ? form.errors.section : null}
                >
                  <Radio.Group onChange={(e) => {
                    form.setFieldValue("section", e.target.value, true);
                  }}
                  >
                    {sections.map((item: any) => {
                      const { id, name } = item;
                      return (
                        <Radio
                          key={id}
                          value={id}
                        >
                          {name}
                        </Radio>
                      );
                    })}
                  </Radio.Group>
                </Form.Item>
              );
            }}
          </Field>
          <Field
            name="post_facebook"
          >
            {({ field, form }: any) => {
              return (
                <Form.Item
                  label={<FieldLabel text="Facebook" icon={<FacebookFilled />} />}
                  style={{
                    display: "block",
                  }}
                >
                  <Input.TextArea
                    rows={4}
                    id="post_facebook"
                    onChange={field.onChange}
                    onBlur={field.onBlur}
                  />
                </Form.Item>
              );
            }}
          </Field>
          <Field
            name="post_twitter"
          >
            {({ field, form }: any) => {
              return (
                <Form.Item
                  style={{
                    display: "block",
                  }}
                  label={<FieldLabel text="Twitter" icon={<TwitterSquareFilled />} />}
                  validateStatus={errors.post_twitter && touched.post_twitter ? "error" : ""}
                  help={errors.post_twitter && touched.post_twitter ? errors.post_twitter : null}
                >
                  <Input.TextArea
                    rows={4}
                    showCount
                    maxLength={200}
                    id="post_twitter"
                    onChange={field.onChange}
                    onBlur={field.onBlur}
                  />
                </Form.Item>
              );
            }}
          </Field>
          <Field
            name="post_instagram"
          >
            {({ field, form }: any) => {
              return (
                <Form.Item
                  style={{
                    display: "block",
                  }}
                  label={<FieldLabel text="Instagram" icon={<InstagramFilled />} />}
                >
                  <Input.TextArea
                    rows={4}
                    id="post_instagram"
                    onChange={field.onChange}
                    onBlur={field.onBlur}
                  />
                </Form.Item>
              );
            }}
          </Field>
          <Field
            name="post_notes"
          >
            {({ field, form }: any) => {
              return (
                <Form.Item
                  style={{
                    display: "block",
                  }}
                  label={<FieldLabel text="Notes" />}
                >
                  <Input.TextArea
                    rows={4}
                    id="post_notes"
                    onChange={field.onChange}
                    onBlur={field.onBlur}
                  />
                </Form.Item>
              );
            }}
          </Field>

          <Field
            name="post_newsletter"
          >
            {({ field, form }: any) => {
              return (
                <Form.Item
                  style={{
                    display: "block",
                  }}
                  label={<FieldLabel text="Newsletter" />}
                >
                  <Input.TextArea
                    rows={4}
                    id="post_newsletter"
                    onChange={field.onChange}
                    onBlur={field.onBlur}
                  />
                </Form.Item>
              );
            }}
          </Field>
          <ResponsiveFormRow>
            <Field
              name="pub_ready_copy"
            >
              {({ field, form }: any) => {
                return (
                  <Form.Item
                    label={<FieldLabel text="Copy-edited" />}
                  >
                    <Switch
                      checked={field.value}
                      onChange={(val) => {
                        form.setFieldValue("pub_ready_copy", val);
                      }}
                    />
                  </Form.Item>
                );
              }}
            </Field>
            <Field
              name="pub_ready_online"
            >
              {({ field, form }: any) => {
                return (
                  <Form.Item
                    label={<FieldLabel text="Ready to publish" />}
                  >
                    <Switch
                      checked={field.value}
                      onChange={(val) => {
                        form.setFieldValue("pub_ready_online", val);
                      }}
                    />
                  </Form.Item>
                );
              }}
            </Field>
          </ResponsiveFormRow>
          <ResponsiveFormRow>
            <Form.Item>
              <Button style={{ marginRight: 10 }} icon={<MailFilled />} htmlType="submit" type="primary">Post now</Button>
              <Button icon={<DeleteFilled />} danger type="primary">Delete</Button>
            </Form.Item>
            <Form.Item>
              <Button
                onClick={() => {
                  onSave && onSave(values);
                }}
                style={{ marginRight: 10 }}
                icon={<SaveOutlined />}
              >
                Save
              </Button>
              <Button
                onClick={() => {
                  onCancel && onCancel(values);
                }}
                icon={<CloseOutlined />}
                danger
              >
                Cancel changes
              </Button>
            </Form.Item>
          </ResponsiveFormRow>
        </FormikForm>
      )}
    </Formik>
  );
};

export default PostForm;
