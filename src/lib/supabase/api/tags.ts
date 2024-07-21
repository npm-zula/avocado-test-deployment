import { supabase } from '@/lib/supabase/config';

import { getAccount } from './userAuth';
import { IUser } from '@/types';


// get all tags
export async function getTags() {
    const { data, error } = await supabase.from('tags').select('*')
    if (error) {
        console.error('Error getting tags: ', error.message)
    }
    return data
}

// get all user tags
export async function getUserTags() {
    const user = await getAccount();
    let profile: IUser | null = null;


    // get user profile using the user id
    if (user) {
        const { data, error } = await supabase.from('user_profiles').select('*').eq('accountUUID', user.id)
        if (error) {
            console.error('Error getting user profile: ', error.message)
        }
        profile = data ? data[0] : null;

    }
    const userId = profile?.id;

    // const { data, error } = await supabase.from('user_tags').select('tag_id').eq('user_id', userId)
    // if (error) {
    //     console.error('Error getting user tags: ', error.message)
    // }


    let { data: user_tags, error } = await supabase
        .from('user_tags')
        .select(`
        tags (
            id,
            tag_name
        )
        `).eq('user_id', userId)

    if (error) {
        console.error('Error getting user tags: ', error.message)
    }

    let tags: { value: string, label: string }[] = [];

    if (user_tags) {
        tags = user_tags.map(item => ({
            value: item.tags.id,
            label: item.tags.tag_name
        }));
    }

    // console.log("tags", tags[0])

    return tags
}

// add user tags
export async function addUserTags(tags: string[], userID: string) {

    console.log(tags, userID)

    const userTags = tags.map((tag) => {
        return {
            user_id: userID,
            tag_id: tag
        }
    })

    const { data, error } = await supabase.from('user_tags').insert(userTags)

    if (error) {
        console.error('Error adding user tags: ', error.message)
    }

    return data
}

