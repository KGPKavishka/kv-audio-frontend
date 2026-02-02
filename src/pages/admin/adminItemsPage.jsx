const sampleArr = [
  {
    key: "AUD-001",
    name: "JBL PartyBox 310",
    price: 185000,
    category: "Audio",
    dimensions: "32cm x 69cm x 36cm",
    description: "High-power portable Bluetooth speaker with deep bass and RGB lighting.",
    availability: true,
    image: [
      "jbl-partybox-310-front.png",
      "jbl-partybox-310-back.png"
    ]
  },
  {
    key: "LGT-002",
    name: "LED Moving Head Light",
    price: 75000,
    category: "Lighting",
    dimensions: "25cm x 30cm x 20cm",
    description: "Professional DJ moving head light with multiple color modes.",
    availability: true,
    image: [
      "moving-head-light.png"
    ]
  },
  {
    key: "AUD-003",
    name: "Wireless Lavalier Microphone",
    price: 22000,
    category: "Audio",
    dimensions: "10cm x 5cm x 2cm",
    description: "Compact wireless microphone ideal for presentations and events.",
    availability: true,
    image: [
      "lavalier-mic.png"
    ]
  },
  {
    key: "LGT-004",
    name: "Stage LED Par Light",
    price: 18000,
    category: "Lighting",
    dimensions: "18cm x 18cm x 10cm",
    description: "RGB LED par light suitable for stage and event lighting.",
    availability: false,
    image: [
      "led-par-light.png"
    ]
  },
  {
    key: "ACC-005",
    name: "Speaker Stand Heavy Duty",
    price: 12000,
    category: "Accessories",
    dimensions: "Adjustable height up to 180cm",
    description: "Durable tripod speaker stand with strong metal body.",
    availability: true,
    image: [
      "speaker-stand.png"
    ]
  }
];


import { useState } from "react";
import { CiCirclePlus } from "react-icons/ci";
import { Link } from "react-router-dom";

export default function AdminItemsPage() {
    const [items, setItems] = useState(sampleArr);

    return(
        <div className="w-full h-full relative">
            
            <table>
                <thead>
                    <th>Key</th>
                    <th>Name</th>
                    <th>Price</th>
                    <th>Category</th>
                    <th>Dimensions</th>
                    <th>Availability</th>
                </thead>
                <tbody>
                    {
                        items.map((product) => {
                            return (
                                <tr key={product.key}>
                                    <td>{product.key}</td>
                                    <td>{product.name}</td>
                                    <td>{product.price}</td>
                                    <td>{product.category}</td>
                                    <td>{product.dimensions}</td>
                                    <td>{product.availability ? "In Stock" : "Out of Stock"}</td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>

            <Link to = "/admin/items/add">
            <CiCirclePlus className="text-[70px] absolute right-10 bottom-10 hover:text-green-500" />
            </Link>

        </div>
    )
}