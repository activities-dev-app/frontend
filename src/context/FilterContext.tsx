"use client"

import Icon from "@/icons";
import { Category } from "@/types";
import { createContext, useCallback, useContext, useEffect, useRef, useState } from "react";
import { Mode } from "./ThemeContext";

type ContextType = {
    filterTerm: string;
    setFilterTerm: React.Dispatch<React.SetStateAction<string>>;
    matchText: (text: string, flags: string | undefined) => RegExpMatchArray | null;
    filter: (categories: Category[]) => Category[];
};

const defaultValue: ContextType = {
    filterTerm: "",
    setFilterTerm: () => { },
    matchText: () => null,
    filter: () => [],
};

const Context = createContext<ContextType>(defaultValue);

export default function FilterContext({ children }: { children: React.ReactNode }) {

    const [filterTerm, setFilterTerm] = useState<string>("");

    const matchText = useCallback((text: string, flags: string | undefined) => {
        try {
            const regex = new RegExp(filterTerm, flags);
            return text.match(regex);
        } catch (err) {
            console.log(err);
            return null;
        }
    }, [filterTerm]);

    const filter = useCallback((categories: Category[]) => {
        return categories.filter(category => {
            if (!matchText(category.name, "gim")) return null;
            return category;
        });
    }, [matchText]);

    const value = { filterTerm, setFilterTerm, matchText, filter };

    return (
        <Context.Provider value={value}>
            {children}
        </Context.Provider>
    );
}

export const useFilter = () => useContext<ContextType>(Context);

interface FilterProps {
    className?: string;
    placeholder?: string | undefined;
    id: string;
    mode?: Mode;
    value: string;
    setValue: React.Dispatch<React.SetStateAction<string>>;
}

export const Filter = (props: FilterProps) => {

    const inputRef = useRef<HTMLInputElement | null>(null);

    return (
        <div className={props.mode ? `filter filter--${props.mode}` : `filter`}>
            <input
                id={props.id}
                type="search"
                ref={inputRef}
                className={props.mode ? `filter__input filter__input--${props.mode}` : `filter__input`}
                placeholder={props.placeholder}
                value={props.value}
                onChange={e => props.setValue(e.target.value)}
            />
            <span onClick={() => { inputRef.current?.focus() }}>
                <Icon
                    icon="search"
                    className={props.mode ?
                        `filter__icon filter__icon--${props.mode} filter__icon--filter` :
                        `filter__icon filter__icon--filter`
                    } />
            </span>
            <span
                onClick={() => {
                    props.setValue("");
                    inputRef.current?.focus();
                }}>
                <Icon
                    icon="x"
                    className={props.mode ?
                        `filter__icon filter__icon--${props.mode} filter__icon--x` :
                        `filter__icon filter__icon--x`
                    } />
            </span>
        </div>
    );
};


export const useRegexReplacement = () => {
    const [value, setValue] = useState<string>("");
    const { setFilterTerm } = useFilter();

    useEffect(() => {
        let replacedValue = value;

        symbols.forEach(symbol => {
            try {
                const regex = new RegExp(symbol, "gim");            
                replacedValue = replacedValue.replace(regex, symbol);
            } catch (err) {
                console.log(err);
            }
        });

        setFilterTerm(replacedValue);
    }, [value, setFilterTerm]);

    return { value, setValue };
};

const symbols = [
    "\\\\",
    "\\+", 
    "\\=",
    "\\-",
    "\\_",
    '\\"',
    "\\'",
    "\\!",
    "\\@",
    "\\#",
    "\\$",
    "\\%",
    "\\¨",
    "\\&",
    "\\*",
    "\\(",
    "\\)",
    "\\[",
    "\\]",
    "\\{",
    "\\}",
    "\\^",
    "\\~",
    "\\:",
    "\\;",
    "\\.",
    "\>",
    "\\,",
    "\<",
    "\\|",
    "\\?",
];

/* 
"use client";

import { useEffect, useRef, useState } from "react";
import { useSearch } from "@/context";
import Icon from "@/icons";

export default function SearchCategory() {
    
    const inputRef = useRef<HTMLInputElement | null>(null);
    const xRef = useRef<HTMLSpanElement | null>(null);
    const searchRef = useRef<HTMLSpanElement | null>(null);
    const [value, setValue] = useState<string>("");

    const { setSearchTerm } = useSearch();

    useEffect(() => {
        setSearchTerm(value)
    }, [value, setSearchTerm]);

    return (
        <div
        className="search"
        onClick={e => {
            if (xRef.current?.contains(e.target as Node)) {
                setValue("");
                inputRef.current?.focus();
            }
            
            if (searchRef.current?.contains(e.target as Node)) {
                inputRef.current?.focus();
            }
            }}> 
            <input
            type="text"
            ref={inputRef}
            className="search__input"
            placeholder="search"
            value={value}
            onChange={e => setValue(e.target.value)}
            />
            <span ref={searchRef}>
                <Icon icon="search" className="search__icon search__icon--search" />
                </span>
                <span ref={xRef}>
                <Icon icon="x" className="search__icon search__icon--x" />
                </span>
                </div>
                );
            };
            */
{/* https://stackoverflow.com/a/58033283/11704817 */ }