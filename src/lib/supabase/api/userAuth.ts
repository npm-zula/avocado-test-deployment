import { supabase } from '@/lib/supabase/config';
import { INewUser } from '@/types';



// ============================== SIGN UP
export async function createUserAccount(user: INewUser) {

    // console.log(user);

    try {
        const { data, error } = await supabase.auth.signUp({
            email: user.email,
            password: user.password,
            options: {
                data: {
                    name: user.name,
                    username: user.username,
                    email: user.email,
                }
            }
        })

        if (error) throw Error;

        const newUser = data.user
        let newUserProfile;
        // console.log(newUser)

        if (newUser) {
            console.log('auth done now saving to db')

            // console.log(newUser.id)
            // console.log(newUser.user_metadata.email)
            // console.log(newUser.user_metadata.name)
            // console.log(newUser.user_metadata.username)


            newUserProfile = await saveUserToDatabase({
                accountId: newUser.id,
                email: newUser.user_metadata.email,
                name: newUser.user_metadata.name,
                username: newUser.user_metadata.username
            });

        }

        return newUserProfile;



    } catch (error) {
        console.log(error);
        return error;
    }
}


// ============================== Save User to Database

export async function saveUserToDatabase(user: {
    accountId: string;
    email: string;
    name: string;
    username?: string;
}) {

    console.log(user);

    try {
        const { data, error } = await supabase
            .from('user_profiles')
            .insert(
                {
                    accountUUID: user.accountId,
                    email: user.email,
                    name: user.name,
                    username: user.username,
                },
            )
            .select()

        console.log(data);

        if (error) throw Error;

        // console.log(data);

        return data;
    } catch (error) {
        console.log(error);
        return error;
    }
}


// ============================== SIGN IN
export async function signInAccount(user: { email: string; password: string }) {
    try {

        // console.log(user);

        const { data: session, error } = await supabase.auth.signInWithPassword({
            email: user.email,
            password: user.password,
        });

        if (error) console.log(error);

        return session.session;
    } catch (error) {
        console.log(error);
    }
}


// ============================== GET ACCOUNT
export async function getAccount() {
    try {
        const { data: { user } } = await supabase.auth.getUser()

        const currentAccount = user;

        return currentAccount;
    } catch (error) {
        console.log(error);
    }
}

// ============================== GET USER 

export async function getCurrentUser() {
    try {
        const currentAccount = await getAccount();

        // console.log(currentAccount);

        if (!currentAccount) throw Error;

        const { data: currentUser, error } = await supabase
            .from('user_profiles')
            .select()
            .eq('accountUUID', currentAccount?.id)

        if (error) throw Error;

        let userProfile = currentUser[0];

        // console.log(userProfile);

        return {
            id: userProfile.id,
            name: userProfile.name,
            username: userProfile.username,
            email: userProfile.email,
            imageUrl: userProfile.imageURL,
            bio: userProfile.bio,
            guac: userProfile.guac,

        }
    } catch (error) {
        console.log(error);
        return null;
    }
}

// ============================== SIGN OUT
export async function signOutAccount() {
    try {
        const { error } = await supabase.auth.signOut()

        if (error) throw Error;

        return true;
    } catch (error) {
        console.log(error);
    }
}




