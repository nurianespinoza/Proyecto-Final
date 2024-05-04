
import { useEffect, useState } from "react";


interface Post {
    id: string;
    name: string;
    location: string;
    description: string;
    imageUrl: string;
    links: string;
    
}

export const usePosts = () => {

    const [data, setData] = useState<Array<Post>>([]);
    const [isLoading, setIsLoading] = useState(true);

    const fetchPosts = async () => {
        const response = await fetch("http://192.168.1.11:3001/");
        const data: Array<Post> = await response.json();

        setData(data);
        setIsLoading(false);
    };

    useEffect(() => {
        fetchPosts();
    }, []);


    return { data, isLoading };
};