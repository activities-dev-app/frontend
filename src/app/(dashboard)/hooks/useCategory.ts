import { useParams } from "next/navigation";
import { useDataContext } from "../context";

export const useCategory = () => {

    const params = useParams();
    const { categories } = useDataContext();

    return { 
        category: categories.filter(category => {
            return category.key === params.categoryId;
        })[0]
    };
};
