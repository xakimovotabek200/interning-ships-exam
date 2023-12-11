import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import axios from 'axios';
import { useForm, Controller } from 'react-hook-form';
import { Button, Input } from 'antd';

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    width: '350px'
  },
};

function Edit({ handleClick, id }) {
  const { handleSubmit, control, reset } = useForm();
  const [modalIsOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    age: '',
    phone_number: '',
    location: '',
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`users/${id}/`);
        const userData = response.data;
        setFormData({
          first_name: userData.first_name,
          last_name: userData.last_name,
          age: userData.age,
          phone_number: userData.phone_number,
          location: userData.location,
        });
        reset(userData);
      } catch (error) {
        console.error('Ma\'lumotlarni olishda xato', error);
      }
    };

    fetchData();
  }, [id, reset]);

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  const handleInputChange = (e, name) => {
    // Input o'zgarib turib, formData ga yangi qiymatni qo'shamiz
    setFormData({
      ...formData,
      [name]: e.target.value,
    });
  };

  const OnEdit = async (formDataUpdate) => {
    try {
      await axios.put(`users/${id}/`, formDataUpdate);
      closeModal();
      handleClick();
    } catch (error) {
      console.error('Xatolik yuz berdi', error);
    }
  };

  return (
    <div>
      <button onClick={openModal}>Edit</button>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <form className="form_post" onSubmit={handleSubmit(OnEdit)}>
          <Controller
            name="first_name"
            control={control}
            defaultValue={formData.first_name}
            render={({ field }) => (
              <Input
                {...field}
                placeholder="Enter first name"
                style={{ marginBottom: "1pc" }}

                onChange={(e) => handleInputChange(e, 'first_name')}
              />
            )}
          />
          <Controller
            name="last_name"
            control={control}
            defaultValue={formData.last_name}
            render={({ field }) => (
              <Input
                {...field}
                placeholder="Enter last name"
                style={{ marginBottom: "1pc" }}
                onChange={(e) => handleInputChange(e, 'last_name')}
              />
            )}
          />
          <Controller
            name="age"
            control={control}
            defaultValue={formData.age}
            render={({ field }) => (
              <Input
                {...field}
                placeholder="Enter age"
                style={{ marginBottom: "1pc" }}

                onChange={(e) => handleInputChange(e, 'age')}
              />
            )}
          />
          <Controller
            name="phone_number"
            control={control}
            defaultValue={formData.phone_number}
            render={({ field }) => (
              <Input
                {...field}
                placeholder="Enter phone number"
                style={{ marginBottom: "1pc" }}

                onChange={(e) => handleInputChange(e, 'phone_number')}
              />
            )}
          />
          <Controller
            name="location"
            control={control}
            defaultValue={formData.location}
            render={({ field }) => (
              <Input
                {...field}
                placeholder="Enter location"
                style={{ marginBottom: "1pc" }}

                onChange={(e) => handleInputChange(e, 'location')}
              />
            )}
          />
          <Button
            type="primary"
            // className="fa-solid fa-edit"
            htmlType="submit"
          >
            Save
          </Button>
        </form>
      </Modal>
    </div>
  );
}

export default Edit;
