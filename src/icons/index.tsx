import {
    IconArrowAutofitHeight,
    IconArrowAutofitWidth,
    IconArrowsMaximize,
    IconArrowsMinimize,
    IconFocusCentered,
    IconZoom,
    IconZoomCancel,
    IconZoomIn,
    IconZoomOut,
    IconZoomReset,
    IconBrandGithub,
    IconMail,
    IconLink,
    IconLinkPlus,
    IconPhoto,
    IconPhotoPlus,
    IconCode,
    IconCodePlus,
    IconTextPlus,
    IconBrandCodesandbox,
} from "@tabler/icons-react";


/* Link Icon */
const link = (className = "") => {
    return (
        <IconLink
            className={className ? `icon icon-link ${className}` : "icon icon-link"}
        />
    );
};

/* Link Icon */
const linkPlus = (className = "") => {
    return (
        <IconLinkPlus
            className={className ? `icon icon-link-plus ${className}` : "icon icon-link-plus"}
        />
    );
};

/* Text Icon */
const text = (className = "") => {
    return (
        <IconTextPlus
            className={className ? `icon icon-text ${className}` : "icon icon-text"}
        />
    );
};

/* Photo Icon */
const photo = (className = "") => {
    return (
        <IconPhoto
            className={className ? `icon icon-photo ${className}` : "icon icon-photo"}
        />
    );
};

const photoPlus = (className = "") => {
    return (
        <IconPhotoPlus
            className={className ? `icon icon-photo-plus ${className}` : "icon icon-photo-plus"}
        />
    );
};

/* Code Icon */
const code = (className = "") => {
    return (
        <IconCode
            className={className ? `icon icon-code ${className}` : "icon icon-code"}
        />
    );
};

const codePlus = (className = "") => {
    return (
        <IconCodePlus
            className={className ? `icon icon-code-plus ${className}` : "icon icon-code-plus"}
        />
    );
};

/* Sandbox Icon */
const codeSandbox = (className = "") => {
    return (
        <IconBrandCodesandbox
            className={className ? `icon icon-code-sandbox ${className}` : "icon icon-code-sandbox"}
        />
    );
};

/* Email Icon */
const email = (className = "") => {
    return (
        <IconMail
            className={className ? `icon icon-email ${className}` : "icon icon-email"}
        />
    );
}

/* Github Brand Icon */
const github = (className = "") => {
    return (
        <IconBrandGithub
            className={className ? `icon icon-github ${className}` : "icon icon-github"}
        />
    );
}

/* Zoom */
const zoomIn = (className = "") => {
    return (
        <IconZoomIn
            className={className ? `icon icon-zoom-in ${className}` : "icon icon-zoom-in"}
        />
    );
}

const zoomOut = (className = "") => {
    return (
        <IconZoomOut
            className={className ? `icon icon-zoom-out ${className}` : "icon icon-zoom-out"}
        />
    );
}

const zoom = (className = "") => {
    return (
        <IconZoom
            className={className ? `icon icon-zoom ${className}` : "icon icon-zoom"}
        />
    );
}

const zoomCancel = (className = "") => {
    return (
        <IconZoomCancel
            className={className ? `icon icon-zoom-cancel ${className}` : "icon icon-zoom-cancel"}
        />
    );
}

const zoomReset = (className = "") => {
    return (
        <IconZoomReset
            className={className ? `icon icon-zoom-reset ${className}` : "icon icon-zoom-reset"}
        />
    );
}

const zoomFitWidth = (className = "") => {
    return (
        <IconArrowAutofitWidth
            className={className ? `icon icon-zoom-fit-width ${className}` : "icon icon-zoom-fit-width"}
        />
    );
}

const zoomFitHeight = (className = "") => {
    return (
        <IconArrowAutofitHeight
            className={className ? `icon icon-zoom-fit-height ${className}` : "icon icon-zoom-fit-height"}
        />
    );
}

const zoomCenter = (className = "") => {
    return (
        <IconFocusCentered
            className={className ? `icon icon-zoom-center ${className}` : "icon icon-zoom-center"}
        />
    );
}

const zoomOriginal = (className = "") => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            className={className ? `icon icon-zoom-original-size ${className}` : "icon icon-zoom-original-size"}
            width="24"
            height="24"
            fill="none"
            viewBox="0 0 24 24">
            <g clipPath="url(#a)">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 8V6a2 2 0 0 1 2-2h2M4 16v2a2 2 0 0 0 2 2h2m8-16h2a2 2 0 0 1 2 2v2m-4 12h2a2 2 0 0 0 2-2v-2" />
                <path fill="currentColor" d="M9.01 17c-.16 0-.3-.06-.42-.18a.59.59 0 0 1-.18-.432v-7.32l-.877.372a1.011 1.011 0 0 1-.384.084.626.626 0 0 1-.444-.168.585.585 0 0 1-.168-.432.65.65 0 0 1 .096-.348.552.552 0 0 1 .3-.228l1.872-.672a.684.684 0 0 1 .228-.048c.184 0 .328.06.432.18a.6.6 0 0 1 .168.444v8.136a.59.59 0 0 1-.18.432.603.603 0 0 1-.444.18Zm2.922-4.896a.826.826 0 0 1-.588-.24.826.826 0 0 1-.24-.588.8.8 0 0 1 .24-.588.806.806 0 0 1 .588-.252.78.78 0 0 1 .588.252.8.8 0 0 1 .24.588c0 .224-.08.42-.24.588a.8.8 0 0 1-.588.24Zm.132 5.088a.826.826 0 0 1-.588-.24.826.826 0 0 1-.24-.588.8.8 0 0 1 .24-.588.806.806 0 0 1 .588-.252.78.78 0 0 1 .588.252.8.8 0 0 1 .24.588c0 .224-.08.42-.24.588a.8.8 0 0 1-.588.24Zm4-.192c-.16 0-.3-.06-.42-.18a.59.59 0 0 1-.18-.432v-7.32l-.876.372a1.011 1.011 0 0 1-.384.084.626.626 0 0 1-.444-.168.585.585 0 0 1-.168-.432.65.65 0 0 1 .096-.348.552.552 0 0 1 .3-.228l1.872-.672a.684.684 0 0 1 .228-.048c.184 0 .328.06.432.18a.6.6 0 0 1 .168.444v8.136a.59.59 0 0 1-.18.432.603.603 0 0 1-.444.18Z" />
            </g>
            <defs>
                <clipPath id="a">
                    <path fill="currentColor" d="M0 0h24v24H0z" />
                </clipPath>
            </defs>
        </svg>
    );
}


const toggleFullscreenOn = (className = "") => {
    return (
        <IconArrowsMaximize
            className={className ? `icon icon-fullscreen-on ${className}` : "icon icon-fullscreen-on"}
        />
    );
}


const toggleFullscreenOff = (className = "") => {
    return (
        <IconArrowsMinimize
            className={className ? `icon icon-fullscreen-off ${className}` : "icon icon-fullscreen-off"}
        />
    );
}


/* Checkbox */
const checkBox = (className = "") => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            className={className ? `icon icon-checkbox ${className}` : "icon icon-checkbox"}
            width={24}
            height={24}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round">
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path d="M9 11l3 3l8 -8" />
            <path d="M20 12v6a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2v-12a2 2 0 0 1 2 -2h9" />
        </svg>
    );
}

const square = (className = "") => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            className={className ? `icon icon-square ${className}` : "icon icon-square"}
            width={24}
            height={24}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M19 2h-14a3 3 0 0 0 -3 3v14a3 3 0 0 0 3 3h14a3 3 0 0 0 3 -3v-14a3 3 0 0 0 -3 -3z" />
        </svg>
    );
}

/* Eye-off icon */
const eyeOff = (className = "") => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            className={className ? `icon icon-eye-off ${className}` : "icon icon-eye-off"}
            width={24}
            height={24}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round">
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path d="M10.585 10.587a2 2 0 0 0 2.829 2.828" />
            <path d="M16.681 16.673a8.717 8.717 0 0 1 -4.681 1.327c-3.6 0 -6.6 -2 -9 -6c1.272 -2.12 2.712 -3.678 4.32 -4.674m2.86 -1.146a9.055 9.055 0 0 1 1.82 -.18c3.6 0 6.6 2 9 6c-.666 1.11 -1.379 2.067 -2.138 2.87" />
            <path d="M3 3l18 18" />
        </svg>
    );
}

/* Eye icon */
const eye = (className = "") => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            className={className ? `icon icon-eye ${className}` : "icon icon-eye"}
            width={24}
            height={24}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round">
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path d="M10 12a2 2 0 1 0 4 0a2 2 0 0 0 -4 0" />
            <path d="M21 12c-2.4 4 -5.4 6 -9 6c-3.6 0 -6.6 -2 -9 -6c2.4 -4 5.4 -6 9 -6c3.6 0 6.6 2 9 6" />
        </svg>
    );
}

/* User-circle icon */
const userCircle = (className = "") => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            className={className ? `icon icon-user-circle ${className}` : "icon icon-user-circle"}
            width={24}
            height={24}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round" >
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0" />
            <path d="M12 10m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0" />
            <path d="M6.168 18.849a4 4 0 0 1 3.832 -2.849h4a4 4 0 0 1 3.834 2.855" />
        </svg>
    );
}

/* Light mode icon */
const light = (className = "") => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            className={className ? `icon icon-sun ${className}` : "icon icon-sun"}
            width={24}
            height={24}
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round">
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path d="M12 12m-4 0a4 4 0 1 0 8 0a4 4 0 1 0 -8 0" />
            <path d="M3 12h1m8 -9v1m8 8h1m-9 8v1m-6.4 -15.4l.7 .7m12.1 -.7l-.7 .7m0 11.4l.7 .7m-12.1 -.7l-.7 .7" />
        </svg>
    );
};

/* Dark mode icon */
const dark = (className = "") => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            className={className ? `icon icon-moon ${className}` : "icon icon-moon"}
            width={24}
            height={24}
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round">
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path d="M12 3c.132 0 .263 0 .393 0a7.5 7.5 0 0 0 7.92 12.446a9 9 0 1 1 -8.313 -12.454z" />
        </svg>
    );
};
/* A-Z icon */
const sortAZ = (className = "") => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            className={className ? `icon icon-sort-a-z ${className}` : "icon icon-sort-a-z"}
            width={24}
            height={24}
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round">
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path d="M16 8h4l-4 8h4" />
            <path d="M4 16v-6a2 2 0 1 1 4 0v6" />
            <path d="M4 13h4" />
            <path d="M11 12h2" />
        </svg>
    );
}

/* Calendar icon */
const calendarClock = (className = "") => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            className={className ? `icon icon-calendar-clock ${className}` : "icon icon-calendar-clock"}
            width={24}
            height={24}
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round">
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path d="M10.5 21h-4.5a2 2 0 0 1 -2 -2v-12a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v3" />
            <path d="M16 3v4" />
            <path d="M8 3v4" />
            <path d="M4 11h10" />
            <path d="M18 18m-4 0a4 4 0 1 0 8 0a4 4 0 1 0 -8 0" />
            <path d="M18 16.5v1.5l.5 .5" />
        </svg>
    );
};

/* Alert icon */
const alertCircle = (className = "") => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            className={className ? `icon icon-alert-circle ${className}` : "icon icon-alert-circle"}
            width="24"
            height="24"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            fill="none"
            stroke-linecap="round"
            stroke-linejoin="round">
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path d="M3 12a9 9 0 1 0 18 0a9 9 0 0 0 -18 0" />
            <path d="M12 8v4" />
            <path d="M12 16h.01" />
        </svg>
    );
};

/* Plus icon */
const plus = (className = "") => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            className={className ? `icon icon-plus ${className}` : "icon icon-plus"}
            width="24"
            height="24"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round">
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path d="M12 5l0 14" />
            <path d="M5 12l14 0" />
        </svg>
    );
}

/* Edit icon */
const edit = (className: string = "") => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            className={className ? `icon icon-edit ${className}` : "icon icon-edit"}
            width="24"
            height="24"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path d="M7 7h-1a2 2 0 0 0 -2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2 -2v-1" />
            <path d="M20.385 6.585a2.1 2.1 0 0 0 -2.97 -2.97l-8.415 8.385v3h3l8.385 -8.415z" />
            <path d="M16 5l3 3" />
        </svg>
    );
};

/* Trash icon */
const trash = (className: string = "") => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            className={className ? `icon icon-trash ${className}` : "icon icon-trash"}
            width="24"
            height="24"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path d="M4 7l16 0" />
            <path d="M10 11l0 6" />
            <path d="M14 11l0 6" />
            <path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12" />
            <path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3" />
        </svg>
    );
};


const arrowDown = (className: string = "") => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            className={className ? `icon icon-arrow-down ${className}` : "icon icon-arrow-down"}
            width="24"
            height="24"
            viewBox="0 0 24 24"
            strokeWidth="2"
            stroke="currentColor"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path d="M12 5l0 14" />
            <path d="M18 13l-6 6" />
            <path d="M6 13l6 6" />
        </svg>
    );
};

const arrowUp = (className: string = "") => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            className={className ? `icon icon-arrow-up ${className}` : "icon icon-arrow-up"}
            width="24"
            height="24"
            viewBox="0 0 24 24"
            strokeWidth="2"
            stroke="currentColor"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path d="M12 5l0 14" />
            <path d="M18 11l-6 -6" />
            <path d="M6 11l6 -6" />
        </svg>
    );
};

const caretLeft = (className: string = "") => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            className={className ? `icon icon-caret-left ${className}` : "icon icon-caret-left"}
            width="24"
            height="24"
            viewBox="0 0 24 24"
            strokeWidth="2"
            stroke="currentColor"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path d="M14 6l-6 6l6 6v-12" />
        </svg>
    );
};

const caretRight = (className: string = "") => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            className={className ? `icon icon-caret-right ${className}` : "icon icon-caret-right"}
            width="24"
            height="24"
            viewBox="0 0 24 24"
            strokeWidth="2"
            stroke="currentColor"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path d="M10 18l6 -6l-6 -6v12" />
        </svg>
    );
};

const loader = (className: string = "") => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            className={className ? `icon icon-tabler-loader ${className}` : "icon icon-tabler-loader"}
            width="24"
            height="24"
            viewBox="0 0 24 24"
            strokeWidth="2"
            stroke="currentColor"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path d="M12 6l0 -3" />
            <path d="M16.25 7.75l2.15 -2.15" />
            <path d="M18 12l3 0" />
            <path d="M16.25 16.25l2.15 2.15" />
            <path d="M12 18l0 3" />
            <path d="M7.75 16.25l-2.15 2.15" />
            <path d="M6 12l-3 0" />
            <path d="M7.75 7.75l-2.15 -2.15" />
        </svg>
    );
};

const refresh = (className: string = "") => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            className={className ? `icon icon-refresh ${className}` : "icon icon-refresh"}
            width="24"
            height="24"
            viewBox="0 0 24 24"
            strokeWidth="2"
            stroke="currentColor"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path d="M20 11a8.1 8.1 0 0 0 -15.5 -2m-.5 -4v4h4" />
            <path d="M4 13a8.1 8.1 0 0 0 15.5 2m.5 4v-4h-4" />
        </svg>
    );
};

const search = (className: string = "") => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            className={className ? `icon icon-search ${className}` : "icon icon-search"}
            width="24"
            height="24"
            viewBox="0 0 24 24"
            strokeWidth="2"
            stroke="currentColor"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path d="M10 10m-7 0a7 7 0 1 0 14 0a7 7 0 1 0 -14 0" />
            <path d="M21 21l-6 -6" />
        </svg>
    );
};

const separator = (className: string = "") => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            className={className ? `icon icon-separator ${className}` : "icon icon-separator"}
            width="24"
            height="24"
            viewBox="0 0 24 24"
            strokeWidth="2"
            stroke="currentColor"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path d="M3 12l0 .01" />
            <path d="M7 12l10 0" />
            <path d="M21 12l0 .01" />
        </svg>

    );
};

const tilde = (className: string = "") => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            className={className ? `icon icon-tilde ${className}` : "icon icon-tilde"}
            width="24"
            height="24"
            viewBox="0 0 24 24"
            strokeWidth="2"
            stroke="currentColor"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path d="M4 12c0 -1.657 1.592 -3 3.556 -3c1.963 0 3.11 1.5 4.444 3c1.333 1.5 2.48 3 4.444 3s3.556 -1.343 3.556 -3" />
        </svg>
    );
};

const x = (className: string = "") => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            className={className ? `icon icon-x ${className}` : "icon icon-x"}
            width="24"
            height="24"
            viewBox="0 0 24 24"
            strokeWidth="2"
            stroke="currentColor"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path d="M18 6l-12 12" />
            <path d="M6 6l12 12" />
        </svg>
    );
};

type IconType =
    "link" |
    "link-plus" |
    "code" |
    "code-plus" |
    "photo" |
    "photo-plus" |
    "text" |
    "codeSandbox" |
    "link" |
    "email" |
    "github" |
    "fullscreen-on" |
    "fullscreen-off" |
    "zoom" |
    "zoom-in" |
    "zoom-out" |
    "zoom-cancel" |
    "zoom-original" |
    "zoom-fit-width" |
    "zoom-fit-height" |
    "zoom-reset" |
    "zoom-center" |
    "square" |
    "checkbox" |
    "eye" |
    "eye-off" |
    "user-circle" |
    "light-mode" |
    "dark-mode" |
    "sort-a-z" |
    "calendar-clock" |
    "alert-circle" |
    "plus" |
    "edit" |
    "trash" |
    "arrow-down" |
    "arrow-up" |
    "caret-left" |
    "caret-right" |
    "loader" |
    "refresh" |
    "search" |
    "separator" |
    "tilde" |
    "x"
    ;


const Icon: React.FC<{ icon: IconType, className?: string }> = ({ icon, className }) => {
    switch (icon) {
        case "code":
            return code(className);
        case "code-plus":
            return codePlus(className);
        case "codeSandbox":
            return codeSandbox(className);
        case "link-plus":
            return linkPlus(className);
        case "photo":
            return photo(className);
        case "photo-plus":
            return photoPlus(className);
        case "text":
            return text(className);
        case "link":
            return link(className);
        case "email":
            return email(className);
        case "github":
            return github(className);
        case "fullscreen-on":
            return toggleFullscreenOn(className);
        case "fullscreen-off":
            return toggleFullscreenOff(className);
        case "zoom":
            return zoom(className);
        case "zoom-in":
            return zoomIn(className);
        case "zoom-out":
            return zoomOut(className);
        case "zoom-cancel":
            return zoomCancel(className);
        case "zoom-original":
            return zoomOriginal(className);
        case "zoom-fit-width":
            return zoomFitWidth(className);
        case "zoom-fit-height":
            return zoomFitHeight(className);
        case "zoom-reset":
            return zoomReset(className);
        case "zoom-center":
            return zoomCenter(className);
        case "checkbox":
            return checkBox(className);
        case "square":
            return square(className);
        case "eye":
            return eye(className);
        case "eye-off":
            return eyeOff(className);
        case "user-circle":
            return userCircle(className);
        case "light-mode":
            return light(className);
        case "dark-mode":
            return dark(className);
        case "sort-a-z":
            return sortAZ(className);
        case "calendar-clock":
            return calendarClock(className);
        case "alert-circle":
            return alertCircle(className);
        case "plus":
            return plus(className);
        case "edit":
            return edit(className);
        case "trash":
            return trash(className);
        case "arrow-down":
            return arrowDown(className);
        case "arrow-up":
            return arrowUp(className);
        case "caret-left":
            return caretLeft(className);
        case "caret-right":
            return caretRight(className);
        case "loader":
            return loader(className);
        case "refresh":
            return refresh(className);
        case "search":
            return search(className);
        case "separator":
            return separator(className);
        case "tilde":
            return tilde(className);
        case "x":
            return x(className);
        default:
            return null;
    }
};

export default Icon;