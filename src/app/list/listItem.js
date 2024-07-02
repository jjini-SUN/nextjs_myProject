'use client'
import Link from "next/link";
import { useState } from "react"

export default function ListItem({data}) {
    const [listData, setListData] = useState(data);

    return(
        <>
            {
                listData && listData.length > 0 ? listData.map((item, index)=>{
                    return(
                        <div key={index} className="list-item">
                            <img src={item.image}/>
                            <Link href={'/detail/' + item._id}>
                                <h4>{item.title}</h4>
                                <p>{item.content}</p>
                            </Link>
                        </div>
                    )
                }) : null
            }
        </>
    )
}