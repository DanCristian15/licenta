<template>
    <div class="u-width-100 d-flex flex-column">
        <div class="d-flex justify-center  mb-10">
            <h1>User Profile</h1>
        </div>
        <div class="d-flex align-center">
            <h3 class="mr-2">
                Name:
            </h3>
            <h3> {{ getLoggedUser.name }} </h3>
        </div>
        <div class="d-flex align-center">
            <h3 class="mr-2">
                Email:
            </h3>
            <h3> {{ getLoggedUser.email }} </h3>
        </div>
        <div class="d-flex align-center">
            <h3 class="mr-2">
                Username:
            </h3>
            <h3> {{ getLoggedUser.username }} </h3>
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
