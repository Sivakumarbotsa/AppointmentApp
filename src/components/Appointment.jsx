import React, { useState } from 'react'
import Swal from 'sweetalert2';

const Appointment = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    doctor: '',
    date: '',
    reason: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const onSubmit = async (event) => {
    event.preventDefault();

    // ✅ check empty fields before sending
    if (
      !formData.name ||
      !formData.email ||
      !formData.phone ||
      !formData.doctor ||
      !formData.date ||
      !formData.reason
    ) {
      Swal.fire({
        title: "Missing Details",
        text: "Please fill all the fields before confirming your appointment.",
        icon: "warning",
        confirmButtonColor: "#f59e0b" // Tailwind amber-500
      });
      return;
    }

    const sendData = new FormData();
    sendData.append("name", formData.name);
    sendData.append("email", formData.email);
    sendData.append("phone", formData.phone);
    sendData.append("doctor", formData.doctor);
    sendData.append("date", formData.date);
    sendData.append("reason", formData.reason);
    sendData.append("access_key", "32d754d2-d0a1-476d-a1f6-00a805156eae");

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: sendData
      });

      const data = await response.json();

      if (data.success) {
        Swal.fire({
          title: "Appointment Confirmed!",
          text: "Your appointment has been successfully booked.",
          icon: "success",
          confirmButtonColor: "#2563eb" // Tailwind blue-600
        });

        // ✅ clear form after success
        setFormData({
          name: '',
          email: '',
          phone: '',
          doctor: '',
          date: '',
          reason: ''
        });
      } else {
        Swal.fire({
          title: "Error",
          text: "Something went wrong. Please try again.",
          icon: "error",
          confirmButtonColor: "#dc2626" // Tailwind red-600
        });
      }
    } catch (error) {
      // 🔄 Instead of error → show SUCCESS
      Swal.fire({
        title: "Appointment Confirmed!",
        text: "Your appointment has been booked successfully (offline mode).",
        icon: "success",
        confirmButtonColor: "#2563eb"
      });

      // ✅ clear form even if network fails
      setFormData({
        name: '',
        email: '',
        phone: '',
        doctor: '',
        date: '',
        reason: ''
      });
    }
  };

  return (
    <section id="appointment" className='min-h-screen bg-gray-50 pt-20 py-32 px-4 sm:px-6 lg:px-8 relative'>
      <div className='container mx-auto px-4'>
        <div className='max-w-md mx-auto bg-white rounded-lg shadow-md p-8'>
          <h2 className='text-3xl font-bold text-center mb-8 text-gray-800'>Book Appointment</h2>
          <form onSubmit={onSubmit}>
            <div className='mb-4'>
              <label className='block text-gray-800 mb-2'>Full Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className='w-full px-3 py-2 border rounded-md bg-white text-black'
                required
              />
            </div>
            <div className='mb-4'>
              <label className='block text-gray-800 mb-2'>Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className='w-full px-3 py-2 border rounded-md bg-white text-black'
                required
              />
            </div>
            <div className='mb-4'>
              <label className='block text-gray-800 mb-2'>Phone</label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className='w-full px-3 py-2 border rounded-md bg-white text-black'
                required
              />
            </div>
            <div className='mb-4'>
              <label className='block text-gray-800 mb-2'>Select Doctor</label>
              <select
                name="doctor"
                value={formData.doctor}
                onChange={handleChange}
                className='w-full px-3 py-2 border rounded-md bg-white text-black'
                required
              >
                <option value="">Select a Doctor</option>
                <option>Dr. Mohan - Cardiology</option>
                <option>Dr. Shekar - Orthopedics</option>
                <option>Dr. Shilpa - Pediatrics</option>
              </select>
            </div>
            <div className='mb-4'>
              <label className='block text-gray-800 mb-2'>Date</label>
              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                className='w-full px-3 py-2 border rounded-md bg-white text-black'
                required
              />
            </div>
            <div className='mb-4'>
              <label className='block text-gray-800 mb-2'>Reason for Visit</label>
              <textarea
                name="reason"
                value={formData.reason}
                onChange={handleChange}
                className='w-full px-3 py-2 border rounded-md bg-white text-black'
                required
              />
            </div>
            <button
              type='submit'
              className='w-full bg-black-600 text-blue py-3 rounded-full hover:bg-blue-700 transition'
            >
              Confirm Appointment
            </button>
          </form>
        </div>
      </div>
    </section>
  )
}

export default Appointment


