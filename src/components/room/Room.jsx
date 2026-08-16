import React, { useEffect, useState } from "react";
import { getAllRooms } from '../utils/ApiFunctions';
import RoomCard from "./RoomCard";
import { Col, Container, Row } from "react-bootstrap";
import RoomFilter from "../common/RoomFilter";
import RoomPaginator from "../common/RoomPaginator";

const Room = () => {
    const [data, setDate] = useState([]);
    const [error, setError] = useState(null);
    const [isLoanding, setIsLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [roomsPerPage] = useState(6);
    const [filteredData, setFilteredData] = useState([{ id: "" }]);
    useEffect(() => {
        setIsLoading(true);
        getAllRooms().then((data) => {
            setDate(data);
            setFilteredData(data);
            setIsLoading(false);
        }).catch((error) => {
            setError(error.message);
            setIsLoading(false);
        })
    }, [])
    if (isLoanding) {
        return <div className="text-danger">Loading room......</div>
    }
    if (error) {
        return <div>Error : {error}</div>
    }

    //pageNumber
    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    }
    const totalPages = Math.ceil(filteredData.length / roomsPerPage);

    const renderRooms = () => {
        const startIndex = (currentPage - 1) * roomsPerPage;
        const endIndex = startIndex + roomsPerPage;
        return filteredData.slice(startIndex, endIndex).map((room) => {
            return(<RoomCard key={room.id} room={room} />);
            
        })
    }



    return (
        <Container>
            <Row>
                <Col md={6} className="mb-3 mb-md=0">
                    <RoomFilter data={data} setFilteredData={setFilteredData} />
                </Col>

                <Col md={6} className="d-flex align-items-center justify-content-end">
                    <RoomPaginator currentPage={currentPage}
                        totalPages={totalPages}
                        onPageChange={handlePageChange} />
                </Col>
            </Row>
            <Row>{renderRooms()}</Row>
            <Row>
                <Col md={6} className="d-flex align-items-center justify-content-end">
                    <RoomPaginator currentPage={currentPage}
                        totalPages={totalPages}
                        onPageChange={handlePageChange} />
                </Col>
            </Row>
        </Container>
    )
}
export default Room;
