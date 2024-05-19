import { Delta } from "quill/core";

export type Category = {
    key: string;
    created_at: number;
    updated_at: number | null;
    name: string;
    description: string;
    userId: string;
}

export type Activity = {
    key: string;
    created_at: number;
    updated_at: number | null;
    categoryId: string,
    name: string;
    description: string;
    userId: string;
}

export type ActivityList = {
    id: string;
    created_at: number;
    updated_at: number | null;
    name: string;
    date: number;
    activities: Activity[];
}[]

export type NewActivity = {
    categoryId: string,
    name: string;
    description: string;
    userId: string;
}

export type ActivityUpdates = {
    name?: string;
    description?: string;
}

export type CategoryUpdates = {
    name?: string;
    description?: string;
}


/* Objects  */
export type LinkData = {
    url?: string;
    label?: string,
    comment?: string,
}

export type TextData = {
    text: string;
}

export type QuillData = {
    delta: Delta | undefined;
    html: string | undefined;
}

export type CodeData = {
    code: string;
    language: string;
}

export type SandboxTemplate =
    "react" |
    "react-typescript" |
    "javascript" |
    "html-css";

export type CodeSandboxData = {
    sandboxId: string;
    template: SandboxTemplate;
}

export type CodePenData = {}

export type LatexData = {}

export type CloudinaryImageData = {
    url: string;
    thumbnailUrl: string;
    width?: number; /* In pixels */
    height?: number; /* In pixels */
    publicId: string;
    version: number;
    versionId: string;
    format: string;
    resourceType: string;
    path: string;
};

export type ImageData = {
    cloudinary: CloudinaryImageData[];
    caption?: string;
    controlId: string;
}

export type ObjectInstanceType =
    "link" |
    "text" |
    "quill" |
    "code" |
    "latex" |
    "image" |
    "codesandbox";

/* Objects */
export type ObjectType = {
    key: string;
    created_at: number;
    updated_at: number | null;
    userId: string;
    activityId: string;
    type: ObjectInstanceType;
    position: number;
    linkData?: LinkData;
    textData?: TextData;
    quillData?: QuillData;
    codeData?: CodeData;
    latexData?: LatexData;
    imageData?: ImageData;
    codeSandboxData?: CodeSandboxData;
}

export type ObjectDataType =
    { linkData: LinkData } |
    { textData: CodeData } |
    { quillData: LinkData } |
    { codeData: CodeData } |
    { latexData: LinkData } |
    { imageData: CodeData } |
    { codeSandboxData: CodeSandboxData };

export type NewObject = {
    userId: string;
    activityId: string;
    type: ObjectInstanceType;
    position: number;
    linkData?: LinkData;
    textData?: TextData;
    quillData?: QuillData;
    codeData?: CodeData;
    latexData?: LatexData;
    imageData?: ImageData;
    codeSandboxData?: CodeSandboxData;
}

/* Objects updates */
export type LinkUpdates = {
    url?: string;
    label?: string;
    comment?: string;
}

export type CodeUpdates = {
    code: string;
    language: string;
}

export type QuillUpdates = {
    delta: string | undefined;
    html: string | undefined;
}

export type codeSandboxUpdates = {
    sandboxId: string | undefined;
    template: SandboxTemplate | undefined;
}

export type ImageUpdates = {
    cloudinary?: CloudinaryImageData[];
    caption?: string;
};

export type TextUpdates = {};
export type LatexUpdates = {};


/* 
    Objects ordering:

    A list of { objectId, position } pairs.

    */


export type ObjectOrdering = {
    objectId: string;
    position: number;
};

export type ObjectsOrdering = ObjectOrdering[];


export type ActivityObjectsOrdering = {
    key: string;
    created_at: number;
    updated_at: number | null;
    userId: string;
    activityId: string;
    ordering: ObjectsOrdering;
};


export type ActivityObjectsOrderingData = {
    userId: string;
    activityId: string;
    ordering: ObjectsOrdering;
}
/*  */




export type User = {
    key: string;
    username?: string;
    email: string;
    name?: string;
    email_verified: boolean;
    active: boolean;
    createdAt: number;
    updatedAt: number | null;
}

export type Session = {
    key: string;
    token: string;
    userId: string;
    email: string,
    name: string,
    username: string,
    active: boolean,
    email_verified: boolean,
    __expires: number,
}

export type LocalSession = {
    email: string,
    username: string,
    name: string,
    userId: string,
    active: boolean,
    email_verified: boolean,
} | null;

export type Hash = {
    key: string;
    userId: string;
    hash: string;
    created_at: number;
    updated_at: number | null;
}