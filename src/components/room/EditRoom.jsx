import React, { useEffect, useState } from 'react';
import { getRoomById, updateRoom } from '../utils/ApiFunctions';
import { Link, useParams } from 'react-router-dom';
import RoomTypeSelector from '../common/RoomTypeSelector'

const EditRoom = () => {
    const [room, setRoom] = useState({
        photo: null,
        roomType: "",
        roomPrice: ""
    })

    const [imagePrview, setImagePreview] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const { roomId } = useParams("");
    const handleImageChange = (e) => {
        const selectedImage = e.target.files[0];
        setRoom({ ...room, photo: selectedImage });
        setImagePreview(URL.createObjectURL(selectedImage));
    }

    const handleInputChange = (event) => {//check price
        const { name, value } = event.target;
        setRoom({ ...room, [name]: value })
    }
    //nap du lieu database vao room 
    const fetchRoom = async () => {
        try {
            const roomData = await getRoomById(roomId);
            setRoom(roomData);
            setImagePreview(roomData.photo);
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        fetchRoom();
    }, [roomId]);

    const handleSubmit = async (event) => {
        event.preventDefault();
        const response = await updateRoom(roomId, room)
        try {
            if (response.status === 200) {
                setSuccessMessage("Room updated successfully!");
                const updatedRoomData = await getRoomById(roomId);
                setRoom(updatedRoomData);
                setImagePreview(updatedRoomData.photo);
                setErrorMessage("");

            } else {
                setErrorMessage("Error updating room");
            }

        } catch (error) {
            console.error(error);
            setErrorMessage(error.message);
        }
    }

    return (
        <>
            <section className="container, mt-5 mb-5">
                <h3 className="text-center mt-5 mt-5">Edit a Room</h3>
                <div className="row justify-content-center">
                    <div className="col-md-8 col-lg-6">
                        {/* kiem tra bieu mau thanh cong hay ko */}
                        {successMessage && (
                            <div className='alert alert-success' role="alert">{successMessage}</div>
                        )}
                        {errorMessage && (
                            <div className='alert alert-danger' role="alert">{errorMessage}</div>
                        )}
                        <form onSubmit={handleSubmit} >
                            <div className="mb-3">
                                <label htmlFor="roomType" className="form-label">Room Type</label>
                                <div>
                                    <RoomTypeSelector handleRoomInputChange={handleInputChange} newRoom={room} />
                                    {/* truyen tham so  props cho children component */}
                                </div>
                            </div>

                            <div className="mb-3">
                                <label htmlFor="roomPrice" className="form-label">Room Price</label>
                                <input className="form-control"
                                    required
                                    id="roomPrice"
                                    type="number"
                                    name="roomPrice"
                                    value={room.roomPrice}
                                    onChange={handleInputChange} />
                            </div>

                            <div className="mb-3">
                                <label htmlFor="photo" className="form-label hotel-color">
                                    Room Photo
                                </label>
                                <input
                                    required
                                    type="file"
                                    id="photo"
                                    name="photo"
                                    className="form-control"
                                    onChange={handleImageChange}
                                />
                                {imagePrview &&
                                    (
                                        <img src={imagePrview} alt="Preview Room Photo"
                                            style={{ maxWidth: "400px", maxHeight: "400px" }}
                                            className="mb-3" />
                                    )}
                            </div>
                            <div className="d-grid d-md-flex mt-2">
                                <Link to={"/existing-rooms"} className="btn btn-outline-info ml-5">
                                    Back
                                </Link>
                                <button className="btn btn-outline-warning">
                                    Edit Room
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </section>
        </>
    )
}
export default EditRoom;