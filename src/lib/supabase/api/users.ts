import { supabase } from '@/lib/supabase/config';
import { IUpdateUser } from '@/types';
import { deleteFile, getFileUrl, uploadFile } from './posts';


// ============================= GET USERS
export async function getUsers(limit?: number) {

    const { data, error } = await supabase.from('user_profiles').select('*').limit(limit || 10)

    if (error) {
        // Handle error
        console.error('Error getting users: ', error.message)
    }

    return data
}

// ====================== GET USER BY ID
export async function getUserById(userId: string) {

    const { data, error } = await supabase.from('user_profiles').select('*').eq('id', userId)

    if (error) {
        // Handle error
        console.error('Error getting user: ', error.message)
    }

    return data

}

// // ============================== UPDATE USER
// export async function updateUser(user: IUpdateUser) {
//     const hasFileToUpdate = user.file.length > 0;

//     try {
//         let image = {
//             imageUrl: user.imageUrl,
//             imageId: user.imageId,
//         };

//         if (hasFileToUpdate) {
//             // Upload new file to Supabase storage
//             const uploadedFile = await uploadFile(user.file[0]); // Custom function to upload file
//             if (!uploadedFile) throw new Error('Failed to upload file');

//             // Get new file URL
//             const fileUrl = getFileUrl(uploadedFile.id); // Custom function to get file URL
//             if (!fileUrl) {
//                 await deleteFile(uploadedFile.id); // Custom function to delete file
//                 throw new Error('Failed to get file URL');
//             }

//             image = { ...image, imageUrl: fileUrl, imageId: uploadedFile.id };
//         }

//         // Update user in Supabase
//         const { data: updatedUser, error } = await supabase
//             .from('users')
//             .update({
//                 name: user.name,
//                 bio: user.bio,
//                 imageUrl: image.imageUrl,
//                 imageId: image.imageId,
//             })
//             .eq('id', user.userId);

//         // Check if update failed
//         if (error || !updatedUser) {
//             // Delete new file that has been recently uploaded
//             if (hasFileToUpdate) {
//                 await deleteFile(image.imageId);
//             }

//             throw new Error('Failed to update user');
//         }

//         // Safely delete old file after successful update
//         if (user.imageId && hasFileToUpdate) {
//             await deleteFile(user.imageId);
//         }

//         return updatedUser;
//     } catch (error) {
//         console.log('Error updating user:', error);
//         throw error; // Rethrow error for further handling if necessary
//     }
// }


// get users sorted by guac scores
export async function getLeaderBoardUsers(sortFilter: string = 'descending') {

    const { data, error } = await supabase
        .from('user_profiles')
        .select('*')
        .order('guac', { ascending: sortFilter === 'ascending' })
        .limit(5)

    if (error) {
        // Handle error
        console.error('Error getting users: ', error.message)
    }

    return data
}