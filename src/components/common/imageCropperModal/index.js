import React, { useRef, useEffect } from 'react';
import 'cropperjs/dist/cropper.css';
import { Cropper } from 'react-cropper'; // Import Cropper component from react-cropper

const ImageCropperModal = ({ show, handleClose, handleCrop, image }) => {
    const cropperRef = useRef(null); // Ref for Cropper component
    const dialogRef = useRef(null); // Ref for <dialog> element

    // Function to handle cropping and obtaining cropped image data URL
    const getCroppedImage = () => {
        if (cropperRef.current) {
            const cropper = cropperRef.current.cropper; // Get CropperJS instance
            const croppedCanvas = cropper.getCroppedCanvas(); // Get cropped canvas
            if (croppedCanvas) {
                const croppedImage = croppedCanvas.toDataURL(); // Convert to data URL
                handleCrop(croppedImage); // Pass cropped image data URL to parent component
            } else {
                console.log('Cropped canvas is null or undefined.');
            }
        } else {
            console.log('Cropper ref is null or undefined.');
        }
    };

    // Function to rotate the image left
    const rotateLeft = () => {
        if (cropperRef.current) {
            const cropper = cropperRef.current.cropper; // Get CropperJS instance
            cropper.rotate(-90); // Rotate left by 90 degrees
        }
    };

    // Function to rotate the image right
    const rotateRight = () => {
        if (cropperRef.current) {
            const cropper = cropperRef.current.cropper; // Get CropperJS instance
            cropper.rotate(90); // Rotate right by 90 degrees
        }
    };

    useEffect(() => {
        const dialogElement = dialogRef.current;
        if (show) {
            dialogElement.showModal();
        } else {
            dialogElement.close();
        }
    }, [show]);

    return (
        <dialog ref={dialogRef}>
            <div className="modal-header">
                <h5 className="modal-title">Редагування фото</h5>
            </div>
            <div className="modal-body col-md-8">
                <Cropper
                    src={image} // Source image to be cropped
                    style={{ height: 500, width: 900 }} // Cropper container style
                    initialAspectRatio={1} // Initial aspect ratio (square)
                    guides={false} // Hide crop guides if needed
                    ref={cropperRef} // Attach Cropper ref
                />
            </div>
            <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={rotateLeft}>Rotate Left</button>
                <button type="button" className="btn btn-secondary" onClick={rotateRight}>Rotate Right</button>
                <button type="button" className="btn btn-primary" onClick={getCroppedImage}>Crop Image</button>
                <button type="button" className="btn btn-secondary" onClick={handleClose}>Close</button>
            </div>
        </dialog>
    );
};

export default ImageCropperModal;