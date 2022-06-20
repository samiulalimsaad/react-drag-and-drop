import type { NextPage } from "next";
import { useState } from "react";

const draggableArr = [
    {
        id: "1",
        color: "bg-red-400",
    },
    {
        id: "2",
        color: "bg-blue-400",
    },
    {
        id: "3",
        color: "bg-teal-400",
    },
    {
        id: "4",
        color: "bg-orange-400",
    },
    {
        id: "5",
        color: "bg-indigo-400",
    },
];

const Home: NextPage = () => {
    const [completed, setCompleted] = useState<any>([]);

    const onDrop = (e: any) => {
        e.preventDefault();
        const div_id = e.dataTransfer.getData("Id");
        // const block = document.getElementById(div_id);
        let dropIndex = Array.from(e.target.children).findIndex(
            (child: any) => child.getBoundingClientRect().right > e.clientX
        );
        console.log(e.target.children[0]?.getBoundingClientRect(), e.clientX);
        if (dropIndex === -1) {
            const newDiv = draggableArr.filter(
                (v) => v.id == e.dataTransfer.getData("Id")
            );
            setCompleted((p: any) => [...p, ...newDiv]);
        } else {
            const newDiv = draggableArr.filter(
                (v) => v.id == e.dataTransfer.getData("Id")
            );
            const newCompleted = completed.splice(dropIndex, 0, ...newDiv);
            setCompleted((p: any) => [...p, ...newCompleted]);
        }
    };

    return (
        <div className="flex items-center justify-center w-screen h-screen gap-8 p-20 overflow-hidden bg-slate-200">
            {/* <div className="h-full overflow-y-scroll"> */}
            <div className="flex flex-wrap items-center justify-center w-1/2 gap-8 p-10 mt-20 bg-white">
                {draggableArr.map((v) => (
                    <div
                        key={v.id}
                        id={v.id}
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
                {completed?.map((v: any) => (
                    <div
                        key={v?.id}
                        className={`h-40 w-40 ${v?.color} grid place-items-center`}
                    >
                        {v?.id}
                    </div>
                ))}
            </div>
        </div>
        // </div>
    );
};

export default Home;
