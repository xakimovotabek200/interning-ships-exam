import { Button, Form, Input, message, Modal } from "antd";
import axios from "axios";
import { useState } from "react";

const CreateUser = () => {
  const [statusCode, setStatusCode] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  console.log(modalVisible);
  const handleCreateUser = async (values) => {
    try {
      const response = await axios.post("/users/", values, {});
      console.log("User created successfully");
      setStatusCode(response.status);
      message.success("User created successfully");
      setModalVisible(true);
    } catch (error) {
      if (error.response && error.response.status === 422) {
        console.error("Validation errors:", error.response.data.errors);
      } else {
        console.error("Error creating user:", error);
        message.error("Error creating user. Please try again.");
      }
    }
  };

  const handleModalOk = () => {
    setModalVisible(true);
  };

  const handleModalCancel = () => {
    setModalVisible(false);
  };

  return (
    <>
      <div >
        <Button onClick={() => setModalVisible(true)}>add</Button>
        {
          modalVisible &&
          <Modal
            width={700}
            title="User Creation Status"
            open={modalVisible}
            onOk={handleModalOk}
            onCancel={handleModalCancel}
          >
            <Form
              name="form"
              onFinish={handleCreateUser}
              className=""
              style={{ width: "500px" }}
            >
              <Form.Item
                label="first_name"
                name="first_name"
                className="mb-5"
                rules={[{ required: true, message: "Username is required" }]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                label="last_name"
                name="last_name"
                className="mb-5"
                rules={[{ required: true, message: "Username is required" }]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                label="age"
                name="age"
                className="mb-5"
                rules={[{ required: true, message: "Username is required" }]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                label="phone_number"
                name="phone_number"
                className="mb-5"
                rules={[{ required: true, message: "Username is required" }]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                label="location"
                name="location"
                className="mb-5"
                rules={[{ required: true, message: "Username is required" }]}
              >
                <Input />
              </Form.Item>

              <Form.Item>
                <Button
                  type="primary"
                  className="bg-blue-500 float-right mt-5"
                  htmlType="submit"
                >
                  Submit
                </Button>
              </Form.Item>
            </Form>
          </Modal>
        }
      </div>
    </>
  );
};

export default CreateUser;
