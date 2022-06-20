import axios from "axios";
import type { NextPage } from "next";
import { Key, useEffect, useState } from "react";
import { blockInterface } from "../backend/utils/Block.Interface";

const operators = [
    {
        _id: "+",
        title: "+",
        value: "+",
        color: "bg-pink-400",
    },
    {
        _id: "-",
        title: "-",
        value: "-",
        color: "bg-cyan-400",
    },
    {
        _id: "*",
        title: "*",
        value: "*",
        color: "bg-emerald-400",
    },
    {
        _id: "/",
        title: "/",
        value: "/",
        color: "bg-purple-400",
    },
];

const Home: NextPage = () => {
    const [equation, setEquation] = useState<blockInterface[]>([]);
    const [blocks, setBlocks] = useState<blockInterface[]>([]);
    const [RHS, setRHS] = useState<string | null>("");

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
        console.log({ dropIndex });
        if (dropIndex === -1) {
            if ("+-*/".includes(e.dataTransfer.getData("Id"))) {
                const newDiv: blockInterface[] = operators.filter(
                    (v) => v._id == e.dataTransfer.getData("Id")
                );
                setEquation((p) => [...p, ...newDiv]);
            } else {
                const newDiv: blockInterface[] = blocks.filter(
                    (v) => v._id == e.dataTransfer.getData("Id")
                );
                setEquation((p) => [...p, ...newDiv]);
            }
        } else {
            if ("+-*/".includes(e.dataTransfer.getData("Id"))) {
                const newDiv: blockInterface[] = operators.filter(
                    (v) => v._id == e.dataTransfer.getData("Id")
                );
                const newEquation = equation.splice(dropIndex, 0, ...newDiv);
                setEquation((p: any) => [...p, ...newEquation]);
            } else {
                const newDiv: blockInterface[] = blocks.filter(
                    (v) => v._id == e.dataTransfer.getData("Id")
                );
                const newEquation = equation.splice(dropIndex, 0, ...newDiv);
                setEquation((p: any) => [...p, ...newEquation]);
            }
        }
    };

    const addComparison = (key: string) => {
        const val = equation[equation?.length - 1].value;
        if (val === key) return;
        if (key === ">" && val === "<") {
            const newEquation = equation.filter((v) => v.value !== "<");
            setEquation([
                ...newEquation,
                { _id: key, title: key, value: key, color: "bg-slate-700" },
            ]);
        } else if (val !== key && key === "<" && val === ">") {
            const newEquation = equation.filter((v) => v.value !== ">");
            setEquation([
                ...newEquation,
                {
                    _id: key,
                    title: key,
                    value: key,
                    color: "bg-slate-700",
                },
            ]);
        } else {
            setEquation((p: any) => [
                ...p,
                { _id: key, title: key, value: key, color: "bg-slate-700" },
            ]);
        }
        console.log({ val, key });
    };

    const removeBlock = (index: number) => {
        setEquation((p) => p.filter((v, i) => i !== index));
    };

    const getRHS = () => {
        const eq = prompt("enter RHS");
        setRHS(eq);
    };

    const execute = () => {
        try {
            const eq = equation.map((v) => v.value).join("") + RHS;
            alert(eval(eq));
        } catch (error) {
            alert("invalid Equation");
        }
    };

    return (
        <div className="w-screen h-screen overflow-hidden bg-slate-200">
            <h1 className="my-8 text-4xl font-semibold text-center">
                Drag And Drop Equation Solver
            </h1>
            <div className="mt-4 bg-white">
                <div className="flex flex-wrap items-center justify-center gap-8 p-10 ">
                    {blocks.map((v) => (
                        <div
                            key={v._id as Key}
                            draggable
                            onDragStart={(e) =>
                                e.dataTransfer.setData("Id", v._id)
                            }
                            className={`h-20 w-20 ${v.color} grid place-items-center`}
                        >
                            {v.title}
                        </div>
                    ))}
                </div>
            </div>
            <div className="flex flex-wrap items-center justify-center gap-20 mt-4 bg-white">
                <div className="flex flex-wrap items-center justify-center gap-8 p-10 ">
                    {operators.map((v) => (
                        <div
                            key={v._id as Key}
                            draggable
                            onDragStart={(e) =>
                                e.dataTransfer.setData("Id", v._id)
                            }
                            className={`h-20 w-20 ${v.color} grid place-items-center text-xl`}
                        >
                            {v.title}
                        </div>
                    ))}
                </div>
                <div className="flex flex-wrap items-center justify-center gap-8 text-xl text-slate-50">
                    <div
                        className={`h-20 w-20 bg-slate-700 grid place-items-center`}
                        onClick={() => addComparison(">")}
                    >
                        {">"}
                    </div>
                    <div
                        className={`h-20 w-20 bg-slate-700 grid place-items-center`}
                        onClick={() => addComparison("<")}
                    >
                        {"<"}
                    </div>
                    <div
                        className={`h-20 w-20 bg-slate-700 grid place-items-center`}
                        onClick={getRHS}
                    >
                        RHS
                    </div>
                </div>
            </div>
            <div
                className="flex justify-center items-center gap-8 bg-white p-10 min-w-20 mt-4 flex-wrap min-h-[10rem] overflow-y-scroll text-slate-50 text-xl"
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
                {RHS && (
                    <div
                        className={`h-20 w-20 bg-slate-700 grid place-items-center relative`}
                    >
                        {RHS}
                    </div>
                )}
            </div>
            <div>
                <button
                    className="w-full p-4 mt-4 shadow-xl bg-sky-500 hover:bg-sky-700 active:bg-sky-700"
                    onClick={execute}
                >
                    Execute
                </button>
            </div>
        </div>
    );
};

export default Home;
