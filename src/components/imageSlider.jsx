import { useState } from "react";

export default function ImageSlider(props) {
    const images = props.images;

    console.log(images);

    const [selectedImage, setSelectedImage] = useState(images[0]);

    return (
        <div className="w-full h-full flex flex-col items-center justify-center">
            <img
                src={selectedImage}
                alt="Product"
                className="w-full h-[500px] object-contain"
            />

            <div className="w-full h-20 flex items-center justify-center gap-4 mt-4">
                {images.map((image, index) => {
                    return (
                        <img
                            key={index}
                            src={image}
                            alt="Product"
                            className={`w-[100px] h-[100px] object-contain cursor-pointer ${image == selectedImage && "border border-accent"}`}
                            onClick={() => {
                                setSelectedImage(image);
                            }}
                        />
                    );
                })}
            </div>
        </div>
    );
}