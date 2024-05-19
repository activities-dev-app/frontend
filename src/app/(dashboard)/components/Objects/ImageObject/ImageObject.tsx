import React, { memo, useCallback, useEffect, useRef, useState } from "react";
import { CldUploadButton, CloudinaryUploadWidgetResults } from "next-cloudinary";
import { useTheme } from "@/context";
import { ObjectType, ImageData, CloudinaryImageData } from "@/types";
import { Button } from "@/components";
import { useDataContext } from "@/app/(dashboard)/context";
import { bulkDeleteFilesFromCloudinary, deleteFileFromCloudinary, deleteFolder } from "./api/cloudinaryApi";
import { Modal } from "@/components/modals";
import { DragGesture, WheelGesture } from "@use-gesture/vanilla";
import Panzoom, { PanzoomObject, PanzoomOptions } from "@panzoom/panzoom";
import Zoomist from "zoomist";
import Icon from "@/icons";

const ImageObjectComponent = ({ obj }: { obj: ObjectType }) => {

    const { mode } = useTheme();

    const { removeObject, updateObject } = useDataContext();

    const [showControls, setShowControls] = useState<boolean>(false);

    const [imageHovered, setImageHovered] = useState<string | undefined>(undefined);

    const [expanded, setExpanded] = useState<{ id: string | undefined, value: boolean }>({ id: undefined, value: false });

    const [showModal, setShowModal] = useState<{
        id: string | undefined,
        imageId: string | undefined,
        imageUrl: string | undefined,
        width: number | undefined,
        height: number | undefined,
        value: boolean
    }>({
        id: undefined,
        imageId: undefined,
        imageUrl: undefined,
        width: undefined,
        height: undefined,
        value: false,
    });

    const { imageData } = obj;

    const deleteResource = useCallback(({ publicId, imageData }: { publicId: string, imageData: ImageData }) => {
        console.log(imageData.cloudinary);

        console.log(imageData.cloudinary.filter(img => {
            return img.publicId !== publicId;
        }));

        updateObject({
            objKey: obj.key,
            type: "image",
            imageUpdates: {
                cloudinary: imageData.cloudinary.filter(img => {
                    return img.publicId !== publicId;
                }),
            }
        });

        deleteFileFromCloudinary({ publicId })
            .then(r => console.log(r));
    }, [obj]);

    const deleteImageObject = useCallback(({ imageData, objKey }: { imageData: ImageData, objKey: string }) => {
        const publicIds = imageData.cloudinary.map(img => {
            return img.publicId;
        });

        bulkDeleteFilesFromCloudinary({ publicIds })
            .then(r => {
                const path = `activity-objects/${obj.userId}/${obj.activityId}/${imageData.controlId}`;
                deleteFolder({ path });
            });

        removeObject(objKey);
    }, [removeObject]);

    if (!imageData) return null;

    return (
        <div className={`image image--${mode}`}>
            <div className="image__list">
                {
                    imageData.cloudinary &&
                    imageData.cloudinary.map(img => {
                        return (
                            <div
                                key={img.publicId}
                                className="image__list__item"
                                onMouseOver={() => setImageHovered(img.publicId)}
                                onMouseLeave={() => {
                                    setImageHovered(undefined);
                                    setExpanded({ ...expanded, value: false });
                                }}>

                                <img
                                    key={img.publicId}
                                    src={img.url}
                                    alt={`${img.publicId}`}
                                    height={200}
                                    onClick={() => {
                                        setShowModal({
                                            id: imageData.controlId,
                                            imageId: img.publicId,
                                            imageUrl: img.url,
                                            width: img.width,
                                            height: img.height,
                                            value: true
                                        });
                                    }}
                                />

                                <div className={imageHovered === img.publicId ?
                                    `image__list__item__buttons-wrapper image__list__item__buttons-wrapper--visible` :
                                    `image__list__item__buttons-wrapper`}>
                                    <div className={expanded.id === img.publicId && expanded.value === true ?
                                        `image__list__item__buttons--expanded` :
                                        `image__list__item__buttons`}>
                                        <div
                                            className="button image__list__item__button image__list__item__button__delete"
                                            onClick={() => {
                                                deleteResource({ imageData, publicId: img.publicId })
                                            }}>
                                            <Icon icon="trash" className="image__list__item__button__delete__icon" />
                                        </div>

                                    </div>
                                    <div>
                                        {
                                            expanded.id === img.publicId && expanded.value === true ?
                                                <button
                                                    className="button image__list__item__button image__list__item__button__close"
                                                    onClick={() => setExpanded({ id: img.publicId, value: false })}>
                                                    <Icon icon="x" className="image__list__item__button__close__icon" />
                                                </button> :
                                                <button
                                                    className="button image__list__item__button image__list__item__button__more"
                                                    onClick={() => setExpanded({ id: img.publicId, value: true })}>
                                                    <Icon icon="plus" className="image__list__item__button__more__icon" />
                                                </button>
                                        }
                                    </div>
                                </div>

                                <ModalImage
                                    imageData={imageData}
                                    setShow={setShowModal}
                                    show={showModal}
                                />

                            </div>
                        );
                    })
                }
            </div>

            <div className="image__details">
                <div className="image__details__main">
                    <AppendImagesComponent obj={obj} imageData={imageData} />
                </div>
                <div className="image__details__danger">
                    <Button onClick={() => setShowControls(!showControls)}>
                        {showControls ? "Less" : "More"}
                    </Button>
                    {
                        showControls &&
                        <div className="image__controls">
                            <Button onClick={() => deleteImageObject({ imageData, objKey: obj.key })}>
                                Remove image object
                            </Button>
                        </div>
                    }
                </div>
            </div>
        </div>
    );
};

export default ImageObjectComponent;

type FocusedImage = {
    id: string | undefined,
    url: string | undefined,
    width: number | undefined,
    height: number | undefined,
};

const ModalImage = ({
    show,
    setShow,
    imageData,
}: {
    show: {
        id: string | undefined,
        imageId: string | undefined,
        imageUrl: string | undefined,
        width: number | undefined,
        height: number | undefined
        value: boolean
    },
    setShow: React.Dispatch<React.SetStateAction<{
        id: string | undefined;
        imageId: string | undefined;
        imageUrl: string | undefined;
        width: number | undefined,
        height: number | undefined
        value: boolean;
    }>>,
    imageData: ImageData,
}) => {

    const { mode } = useTheme();

    const initialValue = { id: show.imageId, url: show.imageUrl, width: show.width, height: show.height };
    const [focusedImage, setFocusedImage] = useState<FocusedImage>(initialValue);
    const [zoom, setZoom] = useState<boolean>(false);

    const imgListRef = useRef<HTMLDivElement>(null);
    const scrollerRef = useRef<HTMLDivElement>(null);
    const fullscreenRef = useRef<HTMLDivElement>(null);

    const { draggableDivRef } = useDragging();

    const {
        zoomableDivRef,
        setZoomFitHeight,
        setZoomFitWidth,
        zoomIn,
        zoomOriginal,
        zoomOut,
        getSize,
        center,
        isImageSmaller,
    } = useZoom({ focusedImage: focusedImage });

    useEffect(() => {
        if (!focusedImage.id) {
            setFocusedImage({ id: show.imageId, url: show.imageUrl, width: show.width, height: show.height });
        }
    }, [show, focusedImage.id, setFocusedImage]);

    const syncThumbnail = useCallback((img: CloudinaryImageData) => {
        focusedImage.id === img.publicId &&
            imgListRef.current && imgListRef.current.childNodes.forEach(node => {
                const currentImg = node as unknown as HTMLImageElement;
                if (currentImg.id === img.publicId) {
                    currentImg.scrollIntoView({ behavior: "smooth", block: "center", inline: "center" });
                }
            });
    }, [focusedImage]);

    const imageSelector = useCallback((selector: "prev" | "next") => {
        let step: number = 0;

        if (selector === "next") {
            step = 1;
        } else {
            step = -1;
        }

        let id = "";

        if (focusedImage.id) {
            id = focusedImage.id;
        } else if (show.imageId) {
            id = show.imageId;
        }

        imageData.cloudinary.forEach((el, index) => {
            if (el.publicId === id) {
                const selectedImage = imageData.cloudinary[index + step];
                if (selectedImage) {
                    setFocusedImage({ id: selectedImage.publicId, url: selectedImage.url, width: selectedImage.width, height: selectedImage.height });
                    setShow({ ...show, imageId: undefined });
                    setZoom(false);
                }
            }
        });
    }, [focusedImage.id, show, imageData.cloudinary, setFocusedImage, setShow]);


    const setInitialZoom = useCallback(() => {
        setZoom(true);

        const parent = draggableDivRef.current;

        if (parent) {
            const w = parent.getBoundingClientRect().width;
            const h = parent.getBoundingClientRect().height;

            if (w > h) {
                setZoomFitWidth({ width: w });
            } else {

                setZoomFitHeight({ height: h });
            }
        }
    }, [setZoom, setZoomFitHeight, setZoomFitWidth]);


    if (show.id !== imageData.controlId || !focusedImage.id || show.value === false) {
        return null;
    }

    return (
        <Modal
            className="image__modal"
            onDismiss={() => {
                setShow({ id: undefined, imageId: undefined, imageUrl: undefined, width: undefined, height: undefined, value: false });
                setFocusedImage({ id: undefined, url: undefined, width: undefined, height: undefined });
                setZoom(false);
            }}>
            <div className="image__modal__fullscreen-container" ref={fullscreenRef}>
                <div className={`image__modal__focused-image__zoom-controls image__modal__focused-image__zoom-controls--${mode}`}>
                    {
                        zoom ?
                            <>
                                <Button className="image__modal__focused-image__zoom-controls__zoom-button"
                                    onClick={() => {
                                        zoomIn();
                                    }}>
                                    <Icon icon="zoom-in" />
                                </Button>
                                <Button className="image__modal__focused-image__zoom-controls__zoom-button"
                                    onClick={() => {
                                        zoomOut();
                                    }}>
                                    <Icon icon="zoom-out" />
                                </Button>
                                <Button className="image__modal__focused-image__zoom-controls__zoom-button"
                                    onClick={() => {
                                        center({ x: 0, y: 0 });
                                    }}>
                                    <Icon icon="zoom-center" />
                                </Button>
                                <Button className="image__modal__focused-image__zoom-controls__zoom-button"
                                    onClick={() => {
                                        zoomOriginal();
                                    }}>
                                    <Icon icon="zoom-original" />
                                </Button>
                                <Button className="image__modal__focused-image__zoom-controls__zoom-button"
                                    onClick={() => {
                                        if (draggableDivRef.current) {
                                            setZoomFitWidth({ width: draggableDivRef.current.getBoundingClientRect().width });
                                        }
                                    }}>
                                    <Icon icon="zoom-fit-width" />
                                </Button>
                                <Button className="image__modal__focused-image__zoom-controls__zoom-button"
                                    onClick={() => {
                                        if (draggableDivRef.current) {
                                            setZoomFitHeight({ height: draggableDivRef.current.getBoundingClientRect().height });
                                        }
                                    }}>
                                    <Icon icon="zoom-fit-height" />
                                </Button>
                                <Button className="image__modal__focused-image__zoom-controls__zoom-button"
                                    onClick={() => {
                                        setZoom(false);
                                    }}>
                                    <Icon icon="zoom-cancel" />
                                </Button>
                                <Button className="image__modal__focused-image__zoom-controls__zoom-button"
                                    onClick={() => {
                                        if (fullscreenRef.current) {
                                            fullscreenRef.current.requestFullscreen();
                                        }
                                    }}>
                                    <Icon icon="fullscreen-on" />
                                </Button>
                            </> :
                            <Button
                                className="image__modal__focused-image__zoom-controls__zoom-button"
                                onClick={setInitialZoom}>
                                <Icon icon="zoom" />
                            </Button>
                    }
                </div>

                <div className="image__modal__focused-image-wrapper">
                    <button
                        className="button image__modal__selector-button image__modal__selector-button--prev"
                        onClick={() => imageSelector("prev")}>
                        <Icon icon="caret-left" />
                    </button>
                    <div className="image__modal__focused-image-container"
                        ref={draggableDivRef}
                        style={
                            isImageSmaller ?
                                {
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "center",
                                } : {}}> {/* draggable container */}
                        {
                            zoom ?
                                <div className="image__modal__focused-image-zoomed-image-wrapper"
                                    ref={zoomableDivRef}
                                    style={{ width: getSize().width, height: getSize().height, margin: "auto" }}>
                                    
                                    <img
                                        className="image__modal__focused-image image__modal__focused-image--zoomed-in"
                                        src={focusedImage.url || show.imageUrl}
                                        alt={`Focused image`}
                                        width={getSize().width}
                                        height={getSize().height}
                                        onDoubleClick={() => setZoom(!zoom)}
                                        draggable={false}
                                    />
                                </div>
                                :
                                <div className="image__modal__focused-image-image-wrapper">
                                    <img
                                        className="image__modal__focused-image image__modal__focused-image--zoomed-out"
                                        src={focusedImage.url || show.imageUrl}
                                        alt={`Focused image`}
                                        width={"100%"}
                                        height={"100%"}
                                        onDoubleClick={setInitialZoom}
                                        draggable={false}
                                    />
                                </div>
                        }
                    </div>
                    <button
                        className="button image__modal__selector-button image__modal__selector-button--next"
                        onClick={() => imageSelector("next")}>
                        <Icon icon="caret-right" />
                    </button>
                </div>

                <div className="image__modal__thumbnails-wrapper" ref={scrollerRef}
                    style={{ padding: "2rem", scrollBehavior: "smooth" }}>
                    <div className="image__modal__thumbnails" ref={imgListRef}>
                        {
                            imageData.cloudinary.map(img => {
                                {
                                    (focusedImage.id === img.publicId || show.imageId === img.publicId) &&
                                        syncThumbnail(img);
                                }
                                return (
                                    <img
                                        id={img.publicId}
                                        className="image__modal__thumbnails__image"
                                        key={img.publicId}
                                        src={img.url}
                                        width={"100rem"}

                                        style={
                                            focusedImage.id === img.publicId || show.imageId === img.publicId ?
                                                { border: "1rem solid lightblue" } :
                                                {}
                                        }
                                        onClick={() => {
                                            setFocusedImage({ id: img.publicId, url: img.url, width: img.width, height: img.height });
                                            setShow({ ...show, imageId: undefined });
                                            setZoom(false);
                                        }}
                                    />
                                );
                            })
                        }
                    </div>
                </div>
            </div>
        </Modal>
    );

};


const AppendImagesComponent = ({ obj, imageData }: { obj: ObjectType, imageData: ImageData }) => {

    const { updateObject } = useDataContext();

    const keyRef = useRef<string>(obj.key);
    const controlIdRef = useRef<string>(imageData.controlId);

    const onAppendSuccess = useCallback((results: CloudinaryUploadWidgetResults) => {

        const responseData = results.info as unknown as {
            format: string;
            path: string;
            public_id: string;
            resource_type: string;
            thumbnail_url: string;
            secure_url: string;
            version: number;
            version_id: string;
            height: number;
            width: number;
        };

        const appendedImage = {
            format: responseData.format,
            path: responseData.path,
            publicId: responseData.public_id,
            resourceType: responseData.resource_type,
            thumbnailUrl: responseData.thumbnail_url,
            url: responseData.secure_url,
            version: responseData.version,
            versionId: responseData.version_id,
            height: responseData.height,
            width: responseData.width,
        };

        const updated = imageData.cloudinary;
        updated.push(appendedImage);

        updateObject({
            objKey: keyRef.current,
            type: "image",
            imageUpdates: { cloudinary: updated },
        });

    }, [imageData]);

    return (
        <CldUploadButton
            className="button add-image-form__button"
            uploadPreset="activity-objects-unsigned-simple-preset"
            onSuccess={onAppendSuccess}
            config={{
                api: {
                    uploadPrefix: `${obj.userId}/${obj.activityId}/${controlIdRef.current}`,
                },
            }}
            options={{
                sources: ["local", "url", "unsplash", "camera"],
                folder: `activity-objects/${obj.userId}/${obj.activityId}/${controlIdRef.current}`,
            }}>
            Append images
        </CldUploadButton>
    );
};


const useDragging = () => {
    const draggableDivRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const el = draggableDivRef.current;
        let dragGesture: DragGesture | undefined = undefined;

        if (el) {
            el.style.touchAction = "none";

            dragGesture = new DragGesture(el, ({ delta }) => {
                el.scrollTop -= delta[1];
                el.scrollLeft -= delta[0];
            });
        }

        return () => {
            if (dragGesture) {
                dragGesture.destroy();
            }
        }

    }, [draggableDivRef.current]);

    return { draggableDivRef }
};


const useZoom = ({ focusedImage }: { focusedImage: FocusedImage }) => {

    const zoomableDivRef = useRef<HTMLDivElement>(null);
    const zoomFactorRef = useRef<number>(1);
    const [zoomFactor, setZoomFactor] = useState<number>(1);

    const shiftRef = useRef<{ x: number, y: number }>({ x: 0, y: 0 });
    const [shift, setShift] = useState<{ x: number, y: number }>({ x: 0, y: 0 });

    const [zoomType, setZoomType] = useState<"original" | "fit-height" | "fit-width" | "zoom-center" | "scale-down">();
    const size = useRef<{ width: number | undefined, height: number | undefined }>({ width: focusedImage.width, height: focusedImage.height });
    const [width, setWidth] = useState<number | undefined>(size.current.width);
    const [height, setHeight] = useState<number | undefined>(size.current.height);

    const [isImageSmaller, setImageSmaller] = useState<boolean>(false);
    const [isWidthSmaller, setWidthSmaller] = useState<boolean>(false);
    const [isHeightSmaller, setHeightSmaller] = useState<boolean>(false);
    

    const updateImageDimensions = useCallback(async () => {
        const originalWidth = focusedImage.width;
        const originalHeight = focusedImage.height;

        if (originalWidth && originalHeight) {
            size.current.width = originalWidth * zoomFactorRef.current;
            size.current.height = originalHeight * zoomFactorRef.current;
        } else {
            size.current.width = originalWidth;
            size.current.height = originalHeight;
        }

        setWidth(size.current.width);
        setHeight(size.current.height);
    }, [size.current.width, size.current.height, zoomFactorRef.current]);


    const zoomIn = useCallback(() => {
        zoomFactorRef.current *= 1.05;
        updateImageDimensions();
        setZoomFactor(zoomFactorRef.current);
    }, [updateImageDimensions]);


    const zoomOut = useCallback(() => {
        zoomFactorRef.current *= 0.95;
        updateImageDimensions();
        setZoomFactor(zoomFactorRef.current);
    }, [updateImageDimensions]);


    const zoomOriginal = useCallback(() => {
        zoomFactorRef.current = 1;
        setZoomType("original");
        updateImageDimensions();
        setZoomFactor(zoomFactorRef.current);
    }, [updateImageDimensions]);


    const setZoomFitHeight = useCallback(({ height }: { height: number }) => {
        const h = focusedImage.height;
        if (h) {
            zoomFactorRef.current = height / h;
            updateImageDimensions();
        }
        setZoomType("fit-height");
        setZoomFactor(zoomFactorRef.current);
    }, [focusedImage.height, updateImageDimensions]);


    const setZoomFitWidth = useCallback(({ width }: { width: number }) => {
        const w = focusedImage.width;
        if (w) {
            zoomFactorRef.current = width / w;
            updateImageDimensions();
        }
        setZoomType("fit-width");
        setZoomFactor(zoomFactorRef.current);
    }, [focusedImage.width, updateImageDimensions]);


    const center = useCallback(({ x, y }: { x: number, y: number }) => {
        const img = zoomableDivRef.current;

        if (img) {
            const parent = img.parentElement;

            if (parent) {

                const parentBounds = {
                    width: parent.getBoundingClientRect().width,
                    height: parent.getBoundingClientRect().height,
                    top: parent.getBoundingClientRect().top,
                    bottom: parent.getBoundingClientRect().bottom,
                    left: parent.getBoundingClientRect().left,
                    right: parent.getBoundingClientRect().right,
                };

                const imgBounds = {
                    width: img.getBoundingClientRect().width,
                    height: img.getBoundingClientRect().height,
                    top: img.getBoundingClientRect().top,
                    bottom: img.getBoundingClientRect().bottom,
                    left: img.getBoundingClientRect().left,
                    right: img.getBoundingClientRect().right,
                };

                const deltaX = (imgBounds.width - parentBounds.width) / 2;
                const deltaY = (imgBounds.height - parentBounds.height) / 2;

                let newX = 0;
                let newY = 0;

                if (imgBounds.width > parentBounds.width) {
                    newX = deltaX - (x * zoomFactorRef.current);
                }

                if (imgBounds.height > parentBounds.height) {
                    newY = deltaY - (y * zoomFactorRef.current);
                }

                parent.scrollTo(newX, newY);
            }
        }

        if (x === 0 && y === 0) {
            shiftRef.current.x = x;
            shiftRef.current.y = y;
            setZoomType("zoom-center");
            setShift({ x, y });
        }
    }, [setZoomType, setShift, zoomableDivRef.current]);


    const getSize = useCallback(() => {
        return {
            width,
            height
        }
    }, [width, height]);

    useEffect(() => {
        const img = zoomableDivRef.current;

        if (img) {
            const parent = img.parentElement;

            if (parent && size.current.width && size.current.height) {
                const widthSmaller = size.current.width < parent.getBoundingClientRect().width;
                const heightSmaller = size.current.height < parent.getBoundingClientRect().height;

                if (widthSmaller && heightSmaller) {
                    setImageSmaller(true);
                    setZoomType("scale-down");
                } else if (widthSmaller) {
                    setWidthSmaller(true);
                } else if (heightSmaller) {
                    setHeightSmaller(true);
                } else {
                    setImageSmaller(false);
                    setWidthSmaller(false);
                    setHeightSmaller(false);
                }
            }
        }
    }, [zoomType, zoomableDivRef.current, width, height, setImageSmaller, setWidthSmaller, setHeightSmaller]);


    /* Mouse up listener */
    useEffect(() => {
        const imageDiv = zoomableDivRef.current;

        const onMouseUp = (e: MouseEvent) => {
            if (imageDiv) {
                const parent = imageDiv.parentElement;
                if (parent) {
                    const childCoords = {
                        x: imageDiv.getBoundingClientRect().x + imageDiv.getBoundingClientRect().width / 2,
                        y: imageDiv.getBoundingClientRect().y + imageDiv.getBoundingClientRect().height / 2,
                    };
                    const parentCoords = {
                        x: parent.getBoundingClientRect().x + parent.getBoundingClientRect().width / 2,
                        y: parent.getBoundingClientRect().y + parent.getBoundingClientRect().height / 2
                    };
                    const currentShift = {
                        x: (childCoords.x - parentCoords.x) / zoomFactorRef.current,
                        y: (childCoords.y - parentCoords.y) / zoomFactorRef.current,
                    };

                    shiftRef.current = currentShift;
                    setShift({ x: currentShift.x, y: currentShift.y });
                }
            }
        };

        if (imageDiv) {
            const parent = imageDiv.parentElement;

            if (parent) {
                parent.addEventListener("mouseup", onMouseUp);
            }
        }

        return () => {
            if (imageDiv) {
                const parent = imageDiv.parentElement;

                if (parent) {

                    parent.removeEventListener("mouseup", onMouseUp);
                }
            }
        };
    }, [zoomableDivRef.current, zoomFactorRef.current]);


    /* Wheel listener */
    useEffect(() => {
        const imageDiv = zoomableDivRef.current;
        let wheelGesture: WheelGesture | undefined = undefined;
        const delay = 10;
        let timer: any;

        if (imageDiv) {
            const parent = imageDiv.parentElement;

            if (parent) {
                wheelGesture = new WheelGesture(parent, ({ delta }) => {
                    clearTimeout(timer);
                    
                    timer = setTimeout(() => {
                        if (delta[1] > 0) {
                            zoomFactorRef.current *= 0.9;
                        } else if (delta[1] < 0) {
                            zoomFactorRef.current *= 1.1;
                        }
                        updateImageDimensions();
                        setZoomFactor(zoomFactorRef.current);
                    }, delay);
                });
            }
        }

        return () => {
            if (wheelGesture) {
                wheelGesture.destroy();
            }
        };
    }, [zoomableDivRef.current, zoomFactorRef.current, updateImageDimensions, setZoomFactor]);


    useEffect(() => {
        center({ x: shiftRef.current.x, y: shiftRef.current.y });
    }, [center, zoomFactorRef.current, width, height]);

    return {
        updateImageDimensions,
        zoomFactor,
        zoomIn,
        zoomOut,
        zoomOriginal,
        setZoomFitHeight,
        setZoomFitWidth,
        zoomableDivRef,
        getSize,
        width,
        height,
        center,
        isImageSmaller,
        isWidthSmaller,
        isHeightSmaller,
        zoomType
    };
};


const usePanzoom = () => {
    const zoomableDivRef = useRef<HTMLDivElement>(null);
    const zoomRef = useRef<PanzoomObject | undefined>(undefined);

    useEffect(() => {
        const el = zoomableDivRef.current;
        let panzoom: PanzoomObject | undefined = undefined;

        let options: PanzoomOptions = {
            disablePan: true,
            //step: .1, /* The step affects zoom calculation when zooming with a mouse wheel, when pinch zooming, or when using zoomIn/zoomOut */

        };

        if (el) {
            panzoom = Panzoom(el, options);
            zoomRef.current = panzoom;
        }

        return () => {
            if (panzoom) {
                panzoom.destroy();
            }
        }
    }, []);

    return { zoomableDivRef, zoomTool: zoomRef.current };
};


/* 
const useDragging = () => {

    const dragRef = useRef<{ x: number | undefined, y: number | undefined }>({ x: undefined, y: undefined });
    const draggableDivRef = useRef<HTMLDivElement>(null);

    const dragStart = (e: DragEvent) => {
        console.log("drag start");

        initData(e);

        if (draggableDivRef.current) {
            const obj = draggableDivRef.current;
            obj.draggable = true;
            if (e.dataTransfer) {
                //e.dataTransfer.setDragImage(obj, e.clientX - obj.getBoundingClientRect().left, e.clientY - obj.getBoundingClientRect().top);
                e.dataTransfer.setDragImage(obj, 999999999, 999999999);
            }
        }
    };

    const dragEnd = (e: DragEvent) => {
        console.log("drag end");
        if (draggableDivRef.current) {
            const obj = draggableDivRef.current;
            obj.draggable = false;
        }
        resetData();
    };

    const dragImage = (e: MouseEvent) => {
        if (draggableDivRef.current) {
            const obj = draggableDivRef.current;
            setTimeout(() => {
                updateData(obj, e);
            }, 250);
        }
    };

    const updateData = (obj: HTMLDivElement, e: MouseEvent) => {
        if (obj) {
            if (dragRef.current.x) {
                const deltaX = dragRef.current.x - e.clientX;

                if (deltaX) {
                    obj.scrollLeft += deltaX;
                    dragRef.current.x = e.clientX;
                }
            }

            if (dragRef.current.y) {
                const deltaY = dragRef.current.y - e.clientY;

                if (deltaY) {
                    obj.scrollTop += deltaY;
                    dragRef.current.y = e.clientY;
                }
            }
        }
    };

    const initData = (e: MouseEvent) => {
        dragRef.current.x = e.clientX;
        dragRef.current.y = e.clientY;
    };

    const resetData = () => {
        if (dragRef.current) {
            dragRef.current.x = undefined;
            dragRef.current.y = undefined;
        }
    };

    const mouseEnter = (e: MouseEvent) => {
        //initData(e);
    };
    const mouseLeave = (e: MouseEvent) => {
        //resetData();
    };
    const mouseDown = (e: MouseEvent) => {
        console.log("mouse down");
        initData(e);
    };
    const mouseUp = (e: MouseEvent) => {
        console.log("mouse up");
        resetData();
    };
    const moveImage = (e: MouseEvent) => {
        if (draggableDivRef.current) {
            const obj = draggableDivRef.current;
            updateData(obj, e);
        }
    };
    const updateMove = (obj: HTMLDivElement, e: MouseEvent) => { };


    useEffect(() => {
        const el = draggableDivRef.current;

        if (el) {
            console.log(el.parentElement);

            //el.addEventListener("dragstart", dragStart);
            //el.addEventListener("dragend", dragEnd);
            //el.addEventListener("dragover", dragImage);
             
            //el.addEventListener("mouseenter", mouseEnter);
            //el.addEventListener("mouseleave", mouseLeave);
                        
            el.addEventListener("mousedown", mouseDown);
            el.addEventListener("mouseup", mouseUp);
            el.addEventListener("mousemove", moveImage);
        }

        return () => {
            if (el) {
                //el.removeEventListener("dragstart", dragStart)
                //el.removeEventListener("dragend", dragEnd);
                //el.addEventListener("dragover", dragImage);
                                 
                //el.removeEventListener("mouseenter", mouseEnter);
                //el.removeEventListener("mouseleave", mouseLeave);
                                
                el.removeEventListener("mousedown", mouseDown);
                el.removeEventListener("mouseup", mouseUp);
                el.removeEventListener("mousemove", moveImage);
            }
        }
    }, [draggableDivRef.current]);

    const dragStopped = new CustomEvent("dragStopped");

    return { draggableDivRef }
}; */