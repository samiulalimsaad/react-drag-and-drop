import axios from "axios";
import type { NextPage } from "next";
import { Key, useEffect, useState } from "react";
import { blockInterface } from "../backend/utils/Block.Interface";

const Home: NextPage = () => {
    const [equation, setEquation] = useState<blockInterface[]>([]);
    const [blocks, setBlocks] = useState<blockInterface[]>([]);
    useEffect(() => {
        const getBlocks = async () => {
            const { data } = await axios.get("/api/blocks");
            setBlocks(data.blocks);
        };
        getBlocks();
    }, []);

    const onDrop = (e: any) => {
        e.preventDefault();
        let dropIndex = Array.from(e.target.children).findIndex(
            (child: any) => child.getBoundingClientRect().right > e.clientX
        );
        if (dropIndex === -1) {
            const newDiv: blockInterface[] = blocks.filter(
                (v: blockInterface) => v._id == e.dataTransfer.getData("Id")
            );
            setEquation((p) => [...p, ...newDiv]);
        } else {
            const newDiv = blocks.filter(
                (v) => v._id == e.dataTransfer.getData("Id")
            );
            const newEquation = equation.splice(dropIndex, 0, ...newDiv);
            setEquation((p: any) => [...p, ...newEquation]);
        }
    };

    const removeBlock = (index: number) => {
        console.log({ index });
        console.log(equation.splice(index, 1));
        setEquation((p) => p.filter((v, i) => i !== index));
    };

    return (
        <div className="w-screen h-screen overflow-hidden bg-slate-200">
            {/* <div className="h-full overflow-y-scroll"> */}
            <div className="mt-4 bg-white">
                <div className="flex flex-wrap items-center justify-center gap-8 p-10 ">
                    {blocks.map((v) => (
                        <div
                            key={v._id as Key}
                            draggable
                            onDragStart={(e) =>
                                e.dataTransfer.setData("Id", "" + v._id)
                            }
                            className={`h-20 w-20 ${v.color} grid place-items-center`}
                        >
                            {v.title}
                        </div>
                    ))}
                </div>
            </div>
            <div className="mt-4 bg-white">
                <div className="flex flex-wrap items-center justify-center gap-8 p-10 ">
                    {blocks.map((v) => (
                        <div
                            key={v._id as Key}
                            id={v._id}
                            draggable
                            onDragStart={(e) =>
                                e.dataTransfer.setData("Id", "" + v._id)
                            }
                            className={`h-20 w-20 ${v.color} grid place-items-center`}
                        >
                            {v.title}
                        </div>
                    ))}
                </div>
            </div>
            <div
                className="flex justify-center items-center gap-8 bg-white p-10 min-w-20 mt-4 flex-wrap min-h-[10rem] overflow-y-scroll"
                onDragOver={(e) => e.preventDefault()}
                onDrop={onDrop}
            >
                {equation?.map((v, i) => (
                    <div
                        key={v._id}
                        className={`h-20 w-20 ${v?.color} grid place-items-center relative`}
                    >
                        <span
                            className="absolute text-xs cursor-pointer top-1 right-2 text-slate-600"
                            onClick={() => removeBlock(i)}
                        >
                            X
                        </span>
                        {v?.title}
                    </div>
                ))}
            </div>
            <div>
                <button className="w-full p-4 mt-4 shadow-xl bg-sky-500 hover:bg-sky-700 active:bg-sky-700">
                    Execute
                </button>
            </div>
        </div>
    );
};

export default Home;
