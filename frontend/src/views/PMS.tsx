import {Bell, Info, Search, UserRound} from "lucide-react";
import usePMSController from "../controllers/usePMSController";

export default function PMS() {

    const {
        selectedDate,
        setSelectedDate,
        dates,
        status,
        rooms
    } = usePMSController();

    return (
        <div className="min-h-screen bg-gray-100 p-5 text-gray-800">

            {/* HEADER */}
            <div className="bg-white rounded-xl shadow px-5 py-4 flex items-center justify-between mb-4">

                <div className="flex items-center gap-3">
                    <div className="text-xl font-bold">
                        AERIS ISLAND
                    </div>
                </div>

                <div className="flex items-center gap-3">

                    <div className="flex items-center border rounded-lg px-4 py-2 w-[420px]">
                        <Search size={18}/>

                        <input
                            className="ml-2 outline-none w-full"
                            placeholder="Search reservations, guests and more"
                        />
                    </div>

                    <Bell size={22} className="text-black"/>
                    <UserRound/>

                </div>

            </div>


            {/* CONTROL BAR */}
            <div className="bg-white rounded-xl shadow p-4">

                <div className="flex items-center justify-between">

                    <div className="flex gap-3 items-center">

                        <input
                            value={selectedDate}
                            onChange={(e)=>setSelectedDate(e.target.value)}
                            className="border rounded-lg px-3 py-2 w-32"
                        />

                        {status.map((item)=>(
                            <div
                                key={item.name}
                                className="bg-gray-100 rounded-full px-4 py-2 text-sm"
                            >
                                {item.name}

                                <span className="ml-2 font-bold">
                                    {item.value}
                                </span>

                            </div>
                        ))}

                    </div>


                    <div className="flex gap-3">

                        <select className="border rounded-lg px-4 py-2">
                            <option>
                                Bed & Breakfast
                            </option>
                        </select>

                        <button className="border rounded-lg px-5 py-2 hover:bg-gray-100">
                            Assign Room
                        </button>

                        <Info/>

                    </div>

                </div>


                {/* CALENDAR HEADER */}
                <div className="mt-5 flex border-t border-b">

                    <div className="w-[280px] p-4 font-semibold">
                        Room Type
                    </div>

                    {dates.map((d,index)=>(
                        <div
                            key={index}
                            className={`flex-1 text-center py-3 border-l ${index===8?"bg-blue-100":""}`}
                        >
                            <div className="text-xs">
                                {d.day}
                            </div>

                            <div className="font-bold">
                                {d.date}
                            </div>

                        </div>
                    ))}

                </div>


                {/* ROOM LIST */}
                <div className="border-b">

                    {rooms.map((room)=>(
                        <div
                            key={room.id}
                            className="flex border-b min-h-[70px]"
                        >

                            <div className="w-[280px] p-4 font-semibold border-r">
                                Room {room.id}
                            </div>


                            <div className="flex flex-1 relative">

                                {dates.map((_,index)=>(
                                    <div
                                        key={index}
                                        className="flex-1 border-r"
                                    />
                                ))}


                                {room.maintenance ? (
                                    <div className="absolute left-4 top-4 bg-red-100 text-red-600 px-4 py-2 rounded-lg text-sm">
                                        Maintenance
                                    </div>
                                ) : (
                                    room.reservations?.map((reservation,index)=>(
                                        <div
                                            key={index}
                                            className={`absolute top-3 ${reservation.color} text-white rounded-lg px-3 py-2 text-sm`}
                                            style={{
                                                left:`${reservation.start * 100 / dates.length}%`,
                                                width:`${(reservation.end - reservation.start) * 100 / dates.length}%`
                                            }}
                                        >
                                            <div className="font-semibold">
                                                {reservation.room}
                                            </div>

                                            <div>
                                                {reservation.guest}
                                            </div>

                                        </div>
                                    ))
                                )}

                            </div>

                        </div>
                    ))}

                </div>

            </div>

        </div>
    );
}