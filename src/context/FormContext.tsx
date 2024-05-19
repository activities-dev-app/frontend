"use client";

import { createContext, useCallback, useContext, useState } from "react";

type ContextType = {
    showCategoryForm: boolean;
    setShowCategoryForm: React.Dispatch<React.SetStateAction<boolean>>;
    showCategoryUpdateForm: boolean;
    setShowCategoryUpdateForm: React.Dispatch<React.SetStateAction<boolean>>;
    showActivityForm: boolean;
    setShowActivityForm: React.Dispatch<React.SetStateAction<boolean>>;
    showActivityUpdateForm: boolean;
    setShowActivityUpdateForm: React.Dispatch<React.SetStateAction<boolean>>;
    emptyActivityNameError: string | boolean | null;
    setEmptyActivityNameError: React.Dispatch<React.SetStateAction<string | boolean | null>>;
    emptyCategoryNameError: string | boolean | null;
    setEmptyCategoryNameError: React.Dispatch<React.SetStateAction<string | boolean | null>>;
    fetchError: boolean;
    setFetchError: React.Dispatch<React.SetStateAction<boolean>>;
    resetInputErrors: () => void;
    evaluateCategoryName: ({ categoryName }: { categoryName: string }) => void;
    evaluateActivityName: ({ activityName }: { activityName: string }) => void;
}

const defaultValue: ContextType = {
    showActivityForm: false,
    setShowActivityForm: () => { },
    showActivityUpdateForm: false,
    setShowActivityUpdateForm: () => { },
    showCategoryForm: false,
    setShowCategoryForm: () => { },
    showCategoryUpdateForm: false,
    setShowCategoryUpdateForm: () => { },
    emptyActivityNameError: null,
    setEmptyActivityNameError: () => { },
    emptyCategoryNameError: null,
    setEmptyCategoryNameError: () => { },
    fetchError: false,
    setFetchError: () => { },
    resetInputErrors: () => { },
    evaluateCategoryName: ({ categoryName }) => { },
    evaluateActivityName: ({ activityName }) => { },
};

const Context = createContext<ContextType>(defaultValue);

export default function FormContext({ children }: { children: React.ReactNode }) {
    return (
        <Context.Provider value={{
            ...useCategoryForm(),
            ...useActivityForm(),
            ...useFormErrors(),
        }}>
            {children}
        </Context.Provider>
    );
}

const useCategoryForm = () => {
    const [showCategoryForm, setShowCategoryForm] = useState<boolean>(false);
    const [showCategoryUpdateForm, setShowCategoryUpdateForm] = useState<boolean>(false);

    return {
        showCategoryForm,
        setShowCategoryForm,
        showCategoryUpdateForm,
        setShowCategoryUpdateForm,
    };
}

const useActivityForm = () => {
    const [showActivityUpdateForm, setShowActivityUpdateForm] = useState<boolean>(false);
    const [showActivityForm, setShowActivityForm] = useState<boolean>(false);

    return {
        showActivityUpdateForm,
        setShowActivityUpdateForm,
        showActivityForm,
        setShowActivityForm,
    };
};

const useFormErrors = () => {

    const [emptyCategoryNameError, setEmptyCategoryNameError] = useState<string | boolean | null>(null);
    const [emptyActivityNameError, setEmptyActivityNameError] = useState<string | boolean | null>(null);
    const [fetchError, setFetchError] = useState<boolean>(false);

    const evaluateCategoryName = useCallback(({ categoryName }: { categoryName: string }) => {
        if (categoryName.length === 0) {
            setEmptyCategoryNameError(true);
        }
    }, []);

    const evaluateActivityName = useCallback(({ activityName }: { activityName: string }) => {
        if (activityName.length === 0) {
            setEmptyActivityNameError(true);
        }
    }, []);

    const resetInputErrors = useCallback(() => {
        setEmptyCategoryNameError(false);
        setEmptyActivityNameError(false);
    }, []);

    return {
        emptyCategoryNameError,
        emptyActivityNameError,
        fetchError,
        setEmptyCategoryNameError,
        setEmptyActivityNameError,
        setFetchError,
        evaluateCategoryName,
        evaluateActivityName,
        resetInputErrors
    };
};

export const useForm = () => useContext(Context);
