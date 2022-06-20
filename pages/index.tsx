import type { NextPage } from "next";
import { useState } from "react";

const draggableArr = [
    {
        id: 1,
        color: "bg-red-400",
    },
    {
        id: 2,
        color: "bg-blue-400",
    },
    {
        id: 3,
        color: "bg-teal-400",
    },
    {
        id: 4,
        color: "bg-orange-400",
    },
    {
        id: 5,
        color: "bg-indigo-400",
    },
];

const Home: NextPage = () => {
    const [completed, setCompleted] = useState([]);

    const onDrop = (e) => {
        const newDiv = draggableArr.filter(
            (v) => v.id == e.dataTransfer.getData("Id")
        );
        console.log({ newDiv }, e.dataTransfer.getData("Id"));
        setCompleted((p) => [...p, ...newDiv]);
    };

    return (
        <div className="h-screen w-screen overflow-hidden flex justify-center items-center gap-8 bg-slate-200 p-20">
            {/* <div className="h-full overflow-y-scroll"> */}
            <div className="flex justify-center flex-wrap w-1/2 items-center gap-8 bg-white p-10 mt-20">
                {draggableArr.map((v) => (
                    <div
                        key={v.id}
                        draggable
                        onDragStart={(e) =>
                            e.dataTransfer.setData("Id", "" + v.id)
                        }
                        className={`h-40 w-40 ${v.color} grid place-items-center`}
                    >
                        {v.id}
                    </div>
                ))}
            </div>
            <div
                className="flex justify-center items-center gap-8 bg-white p-10 min-w-40 w-1/2 mt-20 flex-wrap h-[27rem] overflow-y-scroll"
                onDragOver={(e) => e.preventDefault()}
                onDrop={onDrop}
            >
                {completed?.map((v) => (
                    <div
                        key={v.id}
                        className={`h-40 w-40 ${v.color} grid place-items-center`}
                    >
                        {v.id}
                    </div>
                ))}
            </div>
        </div>
        // </div>
    );
};

export default Home;
