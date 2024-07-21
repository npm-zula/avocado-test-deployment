import { supabase } from '@/lib/supabase/config';



// ========================== SEARCH ACCOUNTS
export const searchAccounts = async (searchValue: string) => {
    const { data, error } = await supabase
        .from('user_profiles')
        .select('username, bio, imageURL')
        .ilike('username', `%${searchValue}%`)
        .limit(5);

    if (error) {
        throw new Error(error.message);
    }

    const Accounts: {
        username: string;
        bio: string;
        imageURL: string;
    }[] = data;

    return Accounts;
};


// ========================== SEARCH POSTS
export const searchPosts = async (searchValue: string) => {
    const { data, error } = await supabase
        .from('posts')
        .select('id, caption, imageUrl, comments, upvotes ')
        .ilike('caption', `%${searchValue}%`)
        .limit(5);

    if (error) {
        throw new Error(error.message);
    }

    let posts: {
        id: string;
        caption: string;
        imageUrl: string;
        comments: any[];
        upvotes: any[];

    }[] = data;

    const formattedPosts = posts.map((post) => {
        return {
            id: post.id,
            caption: post.caption,
            imageUrl: post.imageUrl,
            comments: post.comments?.length,
            upvotes: post.upvotes?.length,
        };
    });

    console.log('formattedPosts', formattedPosts);

    return formattedPosts;
};