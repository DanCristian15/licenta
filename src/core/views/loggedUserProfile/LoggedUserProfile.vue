<template>
    <div class="u-width-100 d-flex flex-column">
        <div class="d-flex justify-center  mb-10">
            <h1>User Profile</h1>
        </div>
        <div class="user-profile-informations ml-10">
        <div class="d-flex align-center">
            <p class="mr-2">
                Name:
            </p>
            <p> {{ getLoggedUser.name }} </p>
        </div>
        <div class="d-flex align-center">
            <p class="mr-2">
                Email:
            </p>
            <p> {{ getLoggedUser.email }} </p>
        </div>
        <div class="d-flex align-center">
            <p class="mr-2">
                Username:
            </p>
            <p> {{ getLoggedUser.username }} </p>
        </div>
        </div>


        <button @click="openEditProfile">
            Edit profile
        </button>
        <EditUserProfile v-if="isEditProfileActive" />
        <button @click="onClickLogOut">
            Log out
        </button>
    </div>
</template>

<script>
    import { mapGetters, mapActions } from 'vuex';
    import EditUserProfile from '@core/shared/components/editUser/EditUserProfile.vue';

    export default( {
        name: 'LoggedUserProfile',
        components: {
            EditUserProfile
        },
        data() {
            return {
                isEditProfileActive: false
            };
        },
        computed: {
            ...mapGetters( {
                getLoggedUser: 'user/loggedUser/getLoggedUser'
            } )
        },
        methods: {
            ...mapActions( {
                commitUnsetLoggedUser: 'user/loggedUser/commitUnsetLoggedUser'
            } ),
            openEditProfile() {
                this.isEditProfileActive = true;
            },
            onClickLogOut() {
                this.commitUnsetLoggedUser();
            }
        }
    } );
</script>


<style lang="scss" scoped>
    .user-profile-informations {
        font-size: 24px !important;
    }
</style>