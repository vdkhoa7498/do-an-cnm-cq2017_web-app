import { Form, Input, Button, Select, Divider } from "antd";
const { Option } = Select;
const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 16,
  },
};
const tailLayout = {
  wrapperCol: {
    offset: 8,
    span: 16,
  },
};

const Register = () => {
  const [form] = Form.useForm();

  const onFinish = (values) => {
    console.log(values);
  };

  const onReset = () => {
    form.resetFields();
  };

  return (
      <div style={{height: 300, width: 500, margin: "auto", marginTop: 100}}>
        <h1>Register</h1>
        <Divider/>
        <Form {...layout} form={form} name="control-hooks" onFinish={onFinish}>
            <Form.Item
                name="name"
                label="Name"
                rules={[
                {
                    required: true,
                },
                ]}
            >
                <Input />
            </Form.Item>
            <Form.Item
                name="role"
                label="Role"
                rules={[
                {
                    required: true,
                },
                ]}
            >
                <Select
                placeholder="Select your role"
                onChange={() => {

                }}
                allowClear
                >
                <Option value="vicegerent">Vicegerent</Option>
                <Option value="organizeCharity">Organized Charity</Option>
                <Option value="donor">Donor</Option>
                </Select>
            </Form.Item>
            
            <Form.Item {...tailLayout}>
                <Button type="primary" htmlType="submit" style={{margin: 2}}>
                Submit
                </Button>
                <Button htmlType="button" onClick={onReset} style={{margin: 2}}>
                Reset
                </Button>
            </Form.Item>
        </Form>
      </div>
    
  );
};

export default Register