import appTenantFactory from '@tenant/app/helpers/appTenantFactory';
import '@tenant/app/scss/main.scss';
import config from './config';

appTenantFactory.create ( config );