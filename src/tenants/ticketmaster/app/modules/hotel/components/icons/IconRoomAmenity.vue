<template>
    <component :is="iconComponent" class="gst-icon-hotel-amenity" />
</template>

<script>
    import IconAirConditioner from '../../assets/svg/amenities/air-conditioner.svg';
    import IconSupermarket from '../../assets/svg/amenities/supermarket.svg';
    import IconFireplace from '../../assets/svg/amenities/fireplace.svg';
    import IconShop from '../../assets/svg/amenities/shop.svg';
    import IconSmokeDetector from '../../assets/svg/amenities/smoke-detector.svg';
    import IconGarden from '../../assets/svg/amenities/garden.svg';
    import IconTerrace from '../../assets/svg/amenities/terrace.svg';
    import IconKeyCollection from '../../assets/svg/amenities/keys.svg';
    import IconMobileCoverage from '../../assets/svg/amenities/phone-coverage.svg';
    import IconWiredInternet from '../../assets/svg/amenities/wired-internet.svg';
    import IconCheckinHour from '../../assets/svg/amenities/checkin.svg';
    import IconRoomService from '../../assets/svg/amenities/room-service.svg';
    import IconLaundryService from '../../assets/svg/amenities/laundry.svg';
    import IconLaunderette from '../../assets/svg/amenities/laundry.svg';
    import IconMedicalService from '../../assets/svg/amenities/medical.svg';
    import IconWheelchair from '../../assets/svg/amenities/wheelchair.svg';
    import Icon24Reception from '../../assets/svg/amenities/24-reception.svg';
    import Icon24Security from '../../assets/svg/amenities/24-security.svg';
    import IconBicycleStorage from '../../assets/svg/amenities/bicycle-storage.svg';
    import IconBicycleHireService from '../../assets/svg/amenities/bicycle.svg';
    import IconCarParking from '../../assets/svg/amenities/parking.svg';
    import IconEVChargingStation from '../../assets/svg/amenities/electric-vehicle.svg';
    import IconGarage from '../../assets/svg/amenities/garage.svg';
    import IconCheckOut from '../../assets/svg/amenities/checkout.svg';
    import IconLateCheckOut from '../../assets/svg/amenities/late-checkout.svg';
    import IconHotelSafe from '../../assets/svg/amenities/safe.svg';
    import IconGym from '../../assets/svg/amenities/gym.svg';
    import IconDayCare from '../../assets/svg/amenities/day-care.svg';
    import IconBabysitting from '../../assets/svg/amenities/baby-sitting.svg';
    import IconCarHire from '../../assets/svg/amenities/car-hire.svg';
    import IconTransferService from '../../assets/svg/amenities/transfer.svg';
    import IconCurrencyExchange from '../../assets/svg/amenities/currency-exchange.svg';
    import IconSecureParking from '../../assets/svg/amenities/24-security.svg';
    import IconMultilingualStaff from '../../assets/svg/amenities/multilingual.svg';
    import IconBellboyService from '../../assets/svg/amenities/bell.svg';
    import IconSmallPet from '../../assets/svg/amenities/small-pet.svg';
    import IconLargePet from '../../assets/svg/amenities/large-pet.svg';
    import IconGolf from '../../assets/svg/amenities/golf.svg';
    import IconWifi from '../../assets/svg/amenities/wifi.svg';
    import IconInternationalCall from '../../assets/svg/amenities/international-calls.svg';
    import IconLuggageRoom from '../../assets/svg/amenities/luggage-room.svg';
    import IconValetParking from '../../assets/svg/amenities/valet-parking.svg';
    import IconAirportShuttle from '../../assets/svg/airport.svg';
    import IconToaster from '../../assets/svg/amenities/toaster.svg';
    import IconOven from '../../assets/svg/amenities/oven.svg';
    import IconDiningArea from '../../assets/svg/amenities/dining.svg';
    import IconClothesDryer from '../../assets/svg/amenities/dryer.svg';
    import IconGrill from '../../assets/svg/amenities/grill.svg';
    import IconSkiDoorAccess from '../../assets/svg/amenities/ski.svg';
    import IconSkiStorage from '../../assets/svg/amenities/ski.svg';
    import IconPrivatePool from '../../assets/svg/amenities/pool.svg';
    import IconPrivateBeach from '../../assets/svg/amenities/beach.svg';
    import IconLibrary from '../../assets/svg/amenities/library.svg';
    import IconKettle from '../../assets/svg/amenities/kettle.svg';
    import IconBikesAvailable from '../../assets/svg/amenities/bicycle.svg';
    import IconTowels from '../../assets/svg/amenities/towels.svg';
    import IconBikeShop from '../../assets/svg/amenities/bicycle.svg';
    import IconConcierge from '../../assets/svg/amenities/concierge.svg';
    import IconCloakroom from '../../assets/svg/amenities/cloakroom.svg';
    import IconLiftAccess from '../../assets/svg/amenities/lift-access.svg';
    import IconNewspaper from '../../assets/svg/amenities/newspaper.svg';
    import IconDefault from '../../assets/svg/amenities/default-amenity-icon.svg';

    export default {
        name: 'IconRoomAmenity',
        props: {
            id: {
                type: Number,
                default: null
            }
        },
        computed: {
            iconComponent() {
                switch ( this.id ) {
                    case 10:
                        return IconAirConditioner;
                    case 100:
                        return IconSupermarket;
                    case 11:
                        return IconFireplace;
                    case 110:
                        return IconShop;
                    case 12:
                        return IconSmokeDetector;
                    case 125:
                        return IconGarden;
                    case 135:
                        return IconTerrace;
                    case 210:
                        return IconKeyCollection;
                    case 240:
                        return IconMobileCoverage;
                    case 250:
                        return IconWiredInternet;
                    case 260:
                        return IconCheckinHour;
                    case 270:
                        return IconRoomService;
                    case 280:
                        return IconLaundryService;
                    case 285:
                        return IconLaunderette;
                    case 290:
                        return IconMedicalService;
                    case 295:
                        return IconWheelchair;
                    case 30:
                        return Icon24Reception;
                    case 300:
                        return IconBicycleStorage;
                    case 310:
                        return IconBicycleHireService;
                    case 320:
                        return IconCarParking;
                    case 321:
                        return IconEVChargingStation;
                    case  330:
                        return IconGarage;
                    case  390:
                        return IconCheckOut;
                    case  40 :
                        return IconHotelSafe;
                    case  430 :
                        return IconTerrace;
                    case  470 :
                        return IconGym;
                    case  475 :
                        return IconDayCare;
                    case  485 :
                        return IconBabysitting;
                    case  490 :
                        return IconCarHire;
                    case  495 :
                        return IconTransferService;
                    case  50 :
                        return IconCurrencyExchange;
                    case  500 :
                        return IconSecureParking;
                    case  505 :
                        return IconMultilingualStaff;
                    case  515 :
                        return IconNewspaper;
                    case  520 :
                        return Icon24Security;
                    case  525 :
                        return IconBellboyService;
                    case  535 :
                        return IconSmallPet;
                    case  540 :
                        return IconLargePet;
                    case  545 :
                        return IconGolf;
                    case  550 :
                        return IconWifi;
                    case  556 :
                        return IconInternationalCall;
                    case  559 :
                        return IconLuggageRoom;
                    case  560 :
                        return IconValetParking;
                    case  562 :
                        return IconAirportShuttle;
                    case  564 :
                        return IconLateCheckOut;
                    case  565 :
                        return IconToaster;
                    case  566 :
                        return IconOven;
                    case  567 :
                        return IconDiningArea;
                    case  568 :
                        return IconClothesDryer;
                    case  569 :
                        return IconGrill;
                    case  570 :
                        return IconSkiDoorAccess;
                    case  571 :
                        return IconGrill;
                    case  572  :
                        return IconSkiStorage;
                    case  573 :
                        return IconPrivatePool;
                    case  574 :
                        return IconPrivateBeach;
                    case  575 :
                        return IconLibrary;
                    case  576 :
                        return IconKettle;
                    case  577 :
                        return IconBikesAvailable;
                    case  578 :
                        return IconTowels;
                    case  579 :
                        return IconBikeShop;
                    case  580 :
                        return IconBicycleHireService;
                    case  585 :
                        return IconConcierge;
                    case  60 :
                        return IconCloakroom;
                    case  70 :
                        return IconLiftAccess;
                    case  90 :
                        return IconNewspaper;
                    default :
                        return IconDefault;
                }
            }
        }
    };
</script>

<style lang="scss">
@import "@scssVariables";
@import "@scssMixins";

.gst-icon-hotel-amenity {
    color: theme-color( 'success' );

    path {
        stroke: theme-color( 'success' );
    }
}
</style>
