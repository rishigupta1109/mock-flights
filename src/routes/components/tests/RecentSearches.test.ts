import { render } from '@testing-library/svelte';
import RecentSearches from '../RecentSearches.svelte'; // replace with the actual path to the RecentSearches component
import { vi } from 'vitest';

import * as UTILS from '../../../utils/flights.utils';

describe('RecentSearches component', () => {
	it('should render "Recent Searches" title', () => {
		vi.spyOn(UTILS, 'getRecentFlightSearches').mockReturnValue([
			{
				src: {
					iataCode: 'BLR',
					city: 'Bangalore',
					name: 'Kempegowda International Airport',
					countryCode: 'IN',
					iconUrl: ''
				},
				des: {
					iataCode: 'BOM',
					city: 'Mumbai',
					name: 'Chhatrapati Shivaji International Airport',
					countryCode: 'IN',
					iconUrl: ''
				},
				departDate: '27-02-2024',
				passenger: {
					adultCount: 1,
					childCount: 0,
					infantCount: 0
				},
				travellerClass: {
					key: 'BUSINESS',
					value: 'Business Class'
				},
				appliedSortFilter: [
					{
						tabId: 'DUMMY',
						sortId: '1',
						filtersList: [
							{
								filterId: 1,
								appliedFilterValueList: {
									filterValues: ['0']
								}
							},
							{
								filterId: 2,
								appliedFilterValueList: {
									filterValues: ['0']
								}
							}
						]
					}
				],
				partnerCountry: 'IN'
			},
			{
				src: {
					iataCode: 'DEL',
					city: 'New Delhi',
					name: 'Indira Gandhi International Airport',
					countryCode: 'IN',
					iconUrl: ''
				},
				des: {
					iataCode: 'BLR',
					city: 'Bangalore',
					name: 'Kempegowda International Airport',
					countryCode: 'IN',
					iconUrl: ''
				},
				departDate: '13-02-2024',
				passenger: {
					adultCount: 1,
					infantCount: 0,
					childCount: 0
				},
				travellerClass: {
					key: 'ECONOMY',
					value: 'Economy Class'
				},
				appliedSortFilter: [
					{
						tabId: 'DUMMY',
						sortId: '1',
						filtersList: [
							{
								filterId: 1,
								appliedFilterValueList: {
									filterValues: ['0']
								}
							},
							{
								filterId: 2,
								appliedFilterValueList: {
									filterValues: ['0']
								}
							}
						]
					}
				],
				partnerCountry: 'IN'
			},
			{
				src: {
					iataCode: 'DEL',
					city: 'New Delhi',
					name: 'Indira Gandhi International Airport',
					countryCode: 'IN',
					iconUrl: ''
				},
				des: {
					iataCode: 'BOM',
					city: 'Mumbai',
					name: 'Chhatrapati Shivaji International Airport',
					countryCode: 'IN',
					iconUrl: ''
				},
				departDate: '13-02-2024',
				passenger: {
					adultCount: 1,
					infantCount: 0,
					childCount: 0
				},
				travellerClass: {
					key: 'ECONOMY',
					value: 'Economy Class'
				},
				appliedSortFilter: [
					{
						tabId: 'DUMMY',
						sortId: '1',
						filtersList: [
							{
								filterId: 1,
								appliedFilterValueList: {
									filterValues: ['0']
								}
							},
							{
								filterId: 2,
								appliedFilterValueList: {
									filterValues: ['0']
								}
							}
						]
					}
				],
				partnerCountry: 'IN'
			},
			{
				src: {
					iataCode: 'IDR',
					city: 'Indore',
					name: 'Devi Ahilyabai Holkar Airport',
					countryCode: 'IN',
					iconUrl: ''
				},
				des: {
					iataCode: 'BOM',
					city: 'Mumbai',
					name: 'Chhatrapati Shivaji International Airport',
					countryCode: 'IN',
					iconUrl: ''
				},
				departDate: '14-02-2024',
				passenger: {
					adultCount: 1,
					infantCount: 0,
					childCount: 0
				},
				travellerClass: {
					key: 'ECONOMY',
					value: 'Economy Class'
				},
				appliedSortFilter: [
					{
						tabId: 'DUMMY',
						sortId: '1',
						filtersList: [
							{
								filterId: 1,
								appliedFilterValueList: {
									filterValues: ['0']
								}
							},
							{
								filterId: 2,
								appliedFilterValueList: {
									filterValues: ['0']
								}
							}
						]
					}
				],
				partnerCountry: 'IN'
			},
			{
				src: {
					iataCode: 'IDR',
					city: 'Indore',
					name: 'Devi Ahilyabai Holkar Airport',
					countryCode: 'IN',
					iconUrl: ''
				},
				des: {
					iataCode: 'BOM',
					city: 'Mumbai',
					name: 'Chhatrapati Shivaji International Airport',
					countryCode: 'IN',
					iconUrl: ''
				},
				departDate: '12-02-2024',
				passenger: {
					adultCount: 1,
					infantCount: 0,
					childCount: 0
				},
				travellerClass: {
					key: 'ECONOMY',
					value: 'Economy Class'
				},
				appliedSortFilter: [
					{
						tabId: 'DUMMY',
						sortId: '1',
						filtersList: [
							{
								filterId: 1,
								appliedFilterValueList: {
									filterValues: ['0']
								}
							},
							{
								filterId: 2,
								appliedFilterValueList: {
									filterValues: ['0']
								}
							}
						]
					}
				],
				partnerCountry: 'IN'
			}
		]);
		const { getByText } = render(RecentSearches);
		expect(getByText('Recent Searches')).toBeInTheDocument();
	});

	it('should render recent searches', () => {
		vi.spyOn(UTILS, 'getRecentFlightSearches').mockReturnValue([
			{
				src: {
					iataCode: 'BLR',
					city: 'Bangalore',
					name: 'Kempegowda International Airport',
					countryCode: 'IN',
					iconUrl: ''
				},
				des: {
					iataCode: 'BOM',
					city: 'Mumbai',
					name: 'Chhatrapati Shivaji International Airport',
					countryCode: 'IN',
					iconUrl: ''
				},
				departDate: '27-02-2024',
				passenger: {
					adultCount: 1,
					childCount: 0,
					infantCount: 0
				},
				travellerClass: {
					key: 'BUSINESS',
					value: 'Business Class'
				},
				appliedSortFilter: [
					{
						tabId: 'DUMMY',
						sortId: '1',
						filtersList: [
							{
								filterId: 1,
								appliedFilterValueList: {
									filterValues: ['0']
								}
							},
							{
								filterId: 2,
								appliedFilterValueList: {
									filterValues: ['0']
								}
							}
						]
					}
				],
				partnerCountry: 'IN'
			},
			{
				src: {
					iataCode: 'DEL',
					city: 'New Delhi',
					name: 'Indira Gandhi International Airport',
					countryCode: 'IN',
					iconUrl: ''
				},
				des: {
					iataCode: 'BLR',
					city: 'Bangalore',
					name: 'Kempegowda International Airport',
					countryCode: 'IN',
					iconUrl: ''
				},
				departDate: '13-02-2024',
				passenger: {
					adultCount: 1,
					infantCount: 0,
					childCount: 0
				},
				travellerClass: {
					key: 'ECONOMY',
					value: 'Economy Class'
				},
				appliedSortFilter: [
					{
						tabId: 'DUMMY',
						sortId: '1',
						filtersList: [
							{
								filterId: 1,
								appliedFilterValueList: {
									filterValues: ['0']
								}
							},
							{
								filterId: 2,
								appliedFilterValueList: {
									filterValues: ['0']
								}
							}
						]
					}
				],
				partnerCountry: 'IN'
			},
			{
				src: {
					iataCode: 'DEL',
					city: 'New Delhi',
					name: 'Indira Gandhi International Airport',
					countryCode: 'IN',
					iconUrl: ''
				},
				des: {
					iataCode: 'BOM',
					city: 'Mumbai',
					name: 'Chhatrapati Shivaji International Airport',
					countryCode: 'IN',
					iconUrl: ''
				},
				departDate: '13-02-2024',
				passenger: {
					adultCount: 1,
					infantCount: 0,
					childCount: 0
				},
				travellerClass: {
					key: 'ECONOMY',
					value: 'Economy Class'
				},
				appliedSortFilter: [
					{
						tabId: 'DUMMY',
						sortId: '1',
						filtersList: [
							{
								filterId: 1,
								appliedFilterValueList: {
									filterValues: ['0']
								}
							},
							{
								filterId: 2,
								appliedFilterValueList: {
									filterValues: ['0']
								}
							}
						]
					}
				],
				partnerCountry: 'IN'
			},
			{
				src: {
					iataCode: 'IDR',
					city: 'Indore',
					name: 'Devi Ahilyabai Holkar Airport',
					countryCode: 'IN',
					iconUrl: ''
				},
				des: {
					iataCode: 'BOM',
					city: 'Mumbai',
					name: 'Chhatrapati Shivaji International Airport',
					countryCode: 'IN',
					iconUrl: ''
				},
				departDate: '14-02-2024',
				passenger: {
					adultCount: 1,
					infantCount: 0,
					childCount: 0
				},
				travellerClass: {
					key: 'ECONOMY',
					value: 'Economy Class'
				},
				appliedSortFilter: [
					{
						tabId: 'DUMMY',
						sortId: '1',
						filtersList: [
							{
								filterId: 1,
								appliedFilterValueList: {
									filterValues: ['0']
								}
							},
							{
								filterId: 2,
								appliedFilterValueList: {
									filterValues: ['0']
								}
							}
						]
					}
				],
				partnerCountry: 'IN'
			},
			{
				src: {
					iataCode: 'IDR',
					city: 'Indore',
					name: 'Devi Ahilyabai Holkar Airport',
					countryCode: 'IN',
					iconUrl: ''
				},
				des: {
					iataCode: 'BOM',
					city: 'Mumbai',
					name: 'Chhatrapati Shivaji International Airport',
					countryCode: 'IN',
					iconUrl: ''
				},
				departDate: '12-02-2024',
				passenger: {
					adultCount: 1,
					infantCount: 0,
					childCount: 0
				},
				travellerClass: {
					key: 'ECONOMY',
					value: 'Economy Class'
				},
				appliedSortFilter: [
					{
						tabId: 'DUMMY',
						sortId: '1',
						filtersList: [
							{
								filterId: 1,
								appliedFilterValueList: {
									filterValues: ['0']
								}
							},
							{
								filterId: 2,
								appliedFilterValueList: {
									filterValues: ['0']
								}
							}
						]
					}
				],
				partnerCountry: 'IN'
			}
		]);
		const { getByText } = render(RecentSearches);
		expect(getByText('New Delhi → Mumbai')).toBeInTheDocument();
	});
});
