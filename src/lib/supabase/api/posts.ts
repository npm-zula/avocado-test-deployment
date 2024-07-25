

import { supabase } from '@/lib/supabase/config';
import { INewPost, IUpdatePost } from '@/types';

import { createClient } from '@supabase/supabase-js';


// ============================== CREATE POST
export async function createPost(post: INewPost, postType: number) {

    console.log(post, postType);
    let file_url:
        string | null = '';

    if (postType != 0) {
        // Upload file to Supabase storage
        const tempFile = post.file as File;

        // file path is posts/userId/file_name
        const filePath = `posts/${post.userId}/${tempFile.name}`;

        // Upload file to Supabase storage

        const uploadedFile = await uploadFile(tempFile, filePath);


        if (!uploadedFile) throw new Error('Failed to upload file');

        // Get file URL
        file_url = await getFileUrl(uploadedFile.path);

        if (!file_url) {
            await deleteFile(uploadedFile.path);
            throw new Error('Failed to get file URL');
        }

        // change imageUrl to the uploaded file url

    }

    // change tags to a single string
    const tags = post.tags?.join(", ") || '';

    const { data, error } = await supabase.from('posts').insert(
        {
            user_id: post.userId,
            caption: post.caption,
            imageUrl: file_url,
            // imageId: uploadedFile.path,
            tags: tags,
        }
    )

    if (error) {
        // Handle error
        console.error('Error creating post: ', error.message)
    }


    // increment the guac number of the user_profile
    await supabase.rpc('update_guac',
        {
            row_id: post.userId,
        }
    )


    return data
}


// ============================== UPLOAD FILE
// Upload file using standard upload
export async function uploadFile(file: File, file_path: string) {

    const { data, error } = await supabase.storage.from('content_storage').upload(file_path, file)
    if (error) {
        // Handle error
        console.error('Error uploading file: ', error.message)
    }

    return data
}



// ============================== GET FILE URL
export async function getFileUrl(file_path: string) {

    console.log(file_path);

    const { data } = await supabase.storage.from('content_storage').getPublicUrl(file_path)

    // convert string to URL
    if (!data) return null;

    console.log(data.publicUrl);

    return data.publicUrl
}


// ============================== DELETE FILE
export async function deleteFile(file_path: string) {
    const { data, error } = await supabase.storage.from('content_storage').remove([file_path])

    if (error) {
        // Handle error
        console.error('Error deleting file: ', error.message)
    }

    return data
}


// // ============================== GET POSTS
// export async function getInfinitePosts(pageParam: number, tag: string, filter: string) {
//     const pageSize = 3;

//     console.log(pageParam, tag, filter);






//     if (tag === 'All') {
//         const { data, error } = await supabase
//             .from('posts')
//             .select(`id, caption, created_at, imageId, imageUrl, upvotes, downvotes, comments
//         ,
//         user_profiles (
//             id,
//             username,
//             name
//         )
//          `)
//             .order('created_at', { ascending: false })
//             .range(pageParam * pageSize, (pageParam + 1) * pageSize - 1); // Adjusted range for pagination

//         //             .order('upvotes', { ascending: filter === 'Most Downvoted' })


//         if (error) {
//             // Handle error
//             console.error('Error getting posts: ', error.message);
//             throw error; // Rethrow the error to handle it outside this function if needed
//         }

//         let formattedData: any = data;

//         return formattedData;
//     }

//     const { data, error } = await supabase
//         .from('posts')
//         .select(`id, caption, created_at, imageId, imageUrl, upvotes, downvotes, comments
//         ,
//         user_profiles (
//             id,
//             username,
//             name
//         )
//          `)
//         .textSearch("tags", `${tag}`, {
//             config: "english",
//         })
//         .order('created_at', { ascending: false })
//         .range(pageParam * pageSize, (pageParam + 1) * pageSize - 1); // Adjusted range for pagination

//     if (error) {
//         // Handle error
//         console.error('Error getting posts: ', error.message);
//         throw error; // Rethrow the error to handle it outside this function if needed
//     }

//     //         .order('upvotes', { ascending: filter === 'Most Downvoted' })


//     let formattedData: any = data;

//     return formattedData;
// }

export async function getInfinitePosts(pageParam: number, tag: string, filter: string) {
    const pageSize = 3;
    console.log(pageParam, tag, filter);

    let query = supabase
        .from('posts')
        .select(`
            id, caption, created_at, imageId, imageUrl, upvotes, downvotes, comments,
            user_profiles (
                id,
                username,
                name
            )
        `);

    // Apply tag filter if not 'All'
    if (tag !== 'All') {
        query = query.textSearch("tags", `${tag}`, {
            config: "english",
        });
    }

    // Apply sorting based on filter
    switch (filter) {
        case 'Most Upvoted':
            query = query.order('upvote_count', { ascending: false, nullsFirst: false });
            console.log('most upvoted');
            break;
        case 'Most Downvoted':
            query = query.order('downvote_count', { ascending: false, nullsFirst: false });
            break;
        default:
            query = query.order('created_at', { ascending: false });
    }

    // Apply pagination
    query = query.range(pageParam * pageSize, (pageParam + 1) * pageSize - 1);

    const { data, error } = await query;

    if (error) {
        console.error('Error getting posts: ', error.message);
        throw error;
    }

    let formattedData: any = data;

    return formattedData;
}


export async function searchPosts(searchTerm: string) {
    try {
        const { data, error } = await supabase
            .from('posts')
            .select('*')
            .ilike('caption', `%${searchTerm}%`); // Use ilike for case-insensitive search

        if (error) {
            console.error('Error searching posts: ', error.message);
            throw error;
        }

        return data;
    } catch (error) {
        console.log(error);
    }
}

// ============================== GET POST BY ID
export async function getPostById(postId?: string) {
    const { data, error } = await supabase
        .from('posts')
        .select('*')
        .eq('id', postId)
        .single();

    if (error) {
        // Handle error
        console.error('Error getting post by id: ', error.message);
        throw error;
    }

    return data;
}


// // ============================== UPDATE POST
// export async function updatePost(post: IUpdatePost) {
//     const hasFileToUpdate = post.file.length > 0;

//     try {
//         let image = {
//             imageUrl: post.imageUrl,
//             imageId: post.imageId,
//         };

//         if (hasFileToUpdate) {
//             // Upload new file to Supabase storage
//             const uploadedFile = await uploadFile(post.file[0]);
//             if (!uploadedFile) throw new Error('Failed to upload file');

//             // Get new file URL
//             const file_url = await getFileUrl(uploadedFile.path);

//             if (!file_url) {
//                 await deleteFile(uploadedFile.path);
//                 throw new Error('Failed to get file URL');
//             }

//             image = { ...image, imageUrl: file_url, imageId: uploadedFile.path };
//         }

//         // Convert tags into array
//         const tags = post.tags?.replace(/ /g, "").split(",") || [];

//         // Update post in Supabase
//         const { data: updatedPost, error } = await supabase
//             .from('posts')
//             .update({
//                 caption: post.caption,
//                 imageUrl: image.imageUrl,
//                 imageId: image.imageId,
//                 location: post.location,
//                 tags: tags,
//             })
//             .eq('id', post.postId);

//         if (error || !updatedPost) {
//             // Delete new file that has been recently uploaded
//             if (hasFileToUpdate) {

//                 await deleteFile(image.imageId);
//             }

//             throw new Error('Failed to update post');
//         }

//         // Safely delete old file after successful update
//         if (hasFileToUpdate) {
//             await deleteFile(post.imageId);
//         }

//         return updatedPost;
//     } catch (error) {
//         console.log(error);
//         throw error;
//     }
// }

// ============================== DELETE POST
export async function deletePost(postId?: string, imageId?: string) {
    try {
        // Delete post from Supabase
        const { data, error } = await supabase
            .from('posts')
            .delete()
            .eq('id', postId);

        if (error || !data) {
            throw new Error('Failed to delete post');
        }

        // Delete image from Supabase storage
        await deleteFile(imageId);

        return data;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

// ============================== LIKE/UNLIKE POST
export async function likePost(postId: string, likesArray: string[]) {

    // upsert into likes table, likesArray is the new array of likes
    const { data, error } = await supabase
        .from('posts')
        .update({ likes: likesArray })
        .eq('id', postId);


    if (error) {
        // Handle error
        console.error('Error liking post: ', error.message);
        throw error;
    }

    return data;
}

// ============================== SAVE POST
export async function savePost(userId: string, postId: string) {
    const { data, error } = await supabase.from('saves').insert([
        {
            user: userId,
            post: postId,
        }
    ])

    if (error) {
        // Handle error
        console.error('Error saving post: ', error.message);
        throw error;
    }

    return data;
}


// ============================== DELETE SAVED POST
export async function deleteSavedPost(savedPostId: string) {
    const { data, error } = await supabase.from('saves').delete().eq('id', savedPostId);

    if (error) {
        // Handle error
        console.error('Error deleting saved post: ', error.message);
        throw error;
    }

    return data;
}


// ============================== GET USER's POSTS
export async function getUserPosts(userId?: string) {
    const { data, error } = await supabase
        .from('posts')
        .select('*')
        .eq('user_id', userId)
        .order('updated_at', { ascending: false });

    if (error) {
        // Handle error
        console.error('Error getting user posts: ', error.message);
        throw error;
    }

    return data;
}


// ============================== GET POPULAR POSTS (BY HIGHEST LIKE COUNT)
export async function getPopularPosts() {
    const { data, error } = await supabase
        .from('posts')
        .select('*')
        .order('likes', { ascending: false });

    if (error) {
        // Handle error
        console.error('Error getting popular posts: ', error.message);
        throw error;
    }

    return data;
}


// ============================== GET RECENT POSTS
export async function getRecentPosts() {
    const { data, error } = await supabase
        .from('posts')
        .select('*')
        .order('created_at', { ascending: false });

    if (error) {
        // Handle error
        console.error('Error getting recent posts: ', error.message);
        throw error;
    }

    return data;
}


// ============================== upvote post
export async function upvotePost(upvotes: string[], postId: string) {
    // add or remove upvotes from upvotes array

    const { data, error } = await supabase
        .from('posts')
        .update({
            upvotes: upvotes,
            upvote_count: upvotes.length
        })
        .eq('id', postId);

    if (error) {
        // Handle error
        console.error('Error upvoting post: ', error.message);
        throw error;
    }

    return data;

}

// ============================== downvote post
export async function downvotePost(downvotes: string[], postId: string) {
    // add or remove downvotes from downvotes array

    console.log(downvotes, postId);

    const { data, error } = await supabase
        .from('posts')
        .update({
            downvotes: downvotes,
            downvote_count: downvotes.length

        })
        .eq('id', postId);

    if (error) {
        // Handle error
        console.error('Error downvoting post: ', error.message);
        throw error;
    }




    return data;

}


// ============================== comment on post
export async function commentOnPost(postId: string, comments: {
    text: string,
    user: {
        id: string,
        username: string,
    }
    created_at: string
}[]) {

    console.log(comments, postId);


    // add the comment in the comments array
    const { data, error } = await supabase
        .from('posts')
        .update({ comments: comments })
        .eq('id', postId);

    if (error) {
        console.error('Error commenting on post: ', error.message);
        throw error;
    }

    return data;

}