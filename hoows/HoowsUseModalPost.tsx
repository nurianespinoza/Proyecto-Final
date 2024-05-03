// import { useState } from 'react';

// interface UseModalProps {
//   initialVisible: boolean;
//   initialLink: { url: string; text: string };
// }

// interface UseModalReturn {
//   modalVisible: boolean;
//   newLink: { url: string; text: string };
//   setModalVisible: (visible: boolean) => void;
//   setNewLink: (link: { url: string; text: string }) => void;
// }

// export const useModal = (props: UseModalProps): UseModalReturn => {
//   const { initialVisible, initialLink } = props;
//   const [modalVisible, setModalVisible] = useState(initialVisible);
//   const [newLink, setNewLink] = useState(initialLink);

//   const handleModalVisible = (visible: boolean) => {
//     setModalVisible(visible);
//     if (!visible) {
//       setNewLink(initialLink);
//     }
//   };

//   return {
//     modalVisible,
//     newLink,
//     setModalVisible: handleModalVisible,
//     setNewLink,
//   };
// };

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
        const response = await fetch("http://192.168.1.8:3001/");
        const data: Array<Post> = await response.json();

        setData(data);
        setIsLoading(false);
    };

    useEffect(() => {
        fetchPosts();
    }, []);


    return { data, isLoading };
};