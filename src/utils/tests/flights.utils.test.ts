import { alertStore, configStore } from '$lib/flights-commons/flights.store';
import { vi } from 'vitest';
import {
	getFormattedWallet,
	catchError,
	getRGBColor,
	getCountFromGuestType,
	containsValidChars,
	cacheData,
	getCachedData,
	cacheRecentFlightSearches,
	getRecentFlightSearches,
	cacheRecentCitySearches,
	getRecentCitySearches
} from '../flights.utils';

describe('getFormattedWallet', () => {
	it('should format wallet correctly with dollar symbol', () => {
		expect(getFormattedWallet(123456, '$')).toBe('$1,23,456');
	});

	it('should format wallet correctly with pound symbol', () => {
		expect(getFormattedWallet(78910, '£')).toBe('£78,910');
	});

	it('should format wallet correctly with euro symbol', () => {
		expect(getFormattedWallet(11213, '€')).toBe('€11,213');
	});

	it('should format wallet correctly with zero amount', () => {
		expect(getFormattedWallet(0, '$')).toBe('$0');
	});

	it('should format wallet correctly with negative amount', () => {
		expect(getFormattedWallet(-123456, '$')).toBe('$-1,23,456');
	});
});

describe('catchError', () => {
	it('should call the callback function and return its result', async () => {
		const callback = vi.fn().mockResolvedValue('test result');
		const result = await catchError(callback);
		expect(callback).toHaveBeenCalled();
		expect(result).toBe('test result');
	});

	it('should catch an error and call the error handler', async () => {
		const callback = vi.fn().mockRejectedValue(new Error('Test error'));
		const errorHandler = vi.fn();
		await catchError(callback, undefined, undefined, errorHandler);
		expect(callback).toHaveBeenCalled();
		expect(errorHandler).toHaveBeenCalled();
	});
});

describe('getRGBColor', () => {
	it('should return correct RGB color for valid color', () => {
		expect(getRGBColor({ red: 255, green: 255, blue: 255 })).toBe('[rgb(255, 255, 255)]');
	});

	it('should return correct RGB color for zero values', () => {
		expect(getRGBColor({ red: 0, green: 0, blue: 0 })).toBe('[rgb(0, 0, 0)]');
	});

	it('should return false for null color', () => {
		expect(getRGBColor(null as any)).toBe(false);
	});
});

describe('getCountFromGuestType', () => {
	const passengersValues = { adultCount: 2, childCount: 1, infantCount: 1 };

	it('should return adult count for ADULT guest type', () => {
		expect(getCountFromGuestType('ADULT', passengersValues)).toBe(2);
	});

	it('should return child count for CHILD guest type', () => {
		expect(getCountFromGuestType('CHILD', passengersValues)).toBe(1);
	});

	it('should return infant count for INFANT guest type', () => {
		expect(getCountFromGuestType('INFANT', passengersValues)).toBe(1);
	});

	it('should return 0 for unknown guest type', () => {
		expect(getCountFromGuestType('UNKNOWN', passengersValues)).toBe(0);
	});
});

describe('containsValidChars', () => {
	configStore.set({
		searchRequest: {
			configMap: {
				SEARCH_CITY_REGEX: '^[a-zA-Z ]+$'
			}
		}
	} as any);
	it('should return true for valid string', () => {
		expect(containsValidChars('validString')).toBe(true);
	});

	it('should return true for string with spaces', () => {
		expect(containsValidChars('valid string')).toBe(true);
	});

	it('should return false for string with special characters', () => {
		expect(containsValidChars('invalid$string')).toBe(false);
	});

	it('should return false for string with numbers', () => {
		expect(containsValidChars('invalid1string')).toBe(false);
	});

	it('should return false for string with emojis', () => {
		expect(containsValidChars('😍')).toBe(false);
	});
});

describe('cacheData', () => {
	beforeEach(() => {
		Storage.prototype.setItem = vi.fn();
	});

	it('should cache string data', () => {
		cacheData('testKey', 'testData', 10000);
		expect(localStorage.setItem).toHaveBeenCalledWith('testKey', JSON.stringify('testData'));
		expect(localStorage.setItem).toHaveBeenCalledWith('testKeyCacheTime', expect.any(String));
	});

	it('should cache object data', () => {
		const data = { prop: 'value' };
		cacheData('testKey', data, 10000);
		expect(localStorage.setItem).toHaveBeenCalledWith('testKey', JSON.stringify(data));
		expect(localStorage.setItem).toHaveBeenCalledWith('testKeyCacheTime', expect.any(String));
	});

	it('should cache array data', () => {
		const data = ['item1', 'item2'];
		cacheData('testKey', data, 10000);
		expect(localStorage.setItem).toHaveBeenCalledWith('testKey', JSON.stringify(data));
		expect(localStorage.setItem).toHaveBeenCalledWith('testKeyCacheTime', expect.any(String));
	});
});

describe('getCachedData', () => {
	it('should return cached data if it is still valid', () => {
		Storage.prototype.getItem = vi.fn().mockImplementation((key) => {
			if (key === 'testKey') return JSON.stringify('testData');
			if (key === 'testKeyCacheTime') return JSON.stringify(Date.now() + 10000);
		});
		expect(getCachedData('testKey')).toBe('testData');
	});

	it('should return null if the cached data has expired', () => {
		Storage.prototype.getItem = vi.fn().mockImplementation((key) => {
			if (key === 'testKey') return JSON.stringify('testData');
			if (key === 'testKeyCacheTime') return JSON.stringify(Date.now() - 10000);
		});

		expect(getCachedData('testKey')).toBe(null);
	});

	it('should return null if there is no cached data', () => {
		Storage.prototype.getItem = vi.fn().mockImplementation((key) => {
			return undefined;
		});
		expect(getCachedData('testKey')).toBe(null);
	});
});

describe('cacheRecentFlightSearches', () => {
	beforeEach(() => {
		Storage.prototype.getItem = vi.fn();
		Storage.prototype.setItem = vi.fn();
	});

	it('should cache a new search', () => {
		const search = { src: { city: 'City1' }, des: { city: 'City2' }, departDate: '2022-01-01' };
		Storage.prototype.getItem = vi.fn().mockReturnValue(null);
		cacheRecentFlightSearches(search as any);
		expect(localStorage.setItem).toHaveBeenCalledWith('recentSearches', JSON.stringify([search]));
	});

	it('should not cache a duplicate search', () => {
		const search = { src: { city: 'City1' }, des: { city: 'City2' }, departDate: '2022-01-01' };
		Storage.prototype.getItem = vi.fn().mockReturnValue(JSON.stringify([search]));
		cacheRecentFlightSearches(search as any);
		expect(localStorage.setItem).not.toHaveBeenCalled();
	});

	it('should remove the oldest search when there are already three searches', () => {
		const search1 = { src: { city: 'City1' }, des: { city: 'City2' }, departDate: '2022-01-01' };
		const search2 = { src: { city: 'City3' }, des: { city: 'City4' }, departDate: '2022-01-02' };
		const search3 = { src: { city: 'City5' }, des: { city: 'City6' }, departDate: '2022-01-03' };
		const newSearch = { src: { city: 'City7' }, des: { city: 'City8' }, departDate: '2022-01-04' };
		Storage.prototype.getItem = vi
			.fn()
			.mockReturnValue(JSON.stringify([search1, search2, search3]));
		cacheRecentFlightSearches(newSearch as any);
		expect(localStorage.setItem).toHaveBeenCalledWith(
			'recentSearches',
			JSON.stringify([newSearch, search1, search2])
		);
	});
});

describe('getRecentFlightSearches', () => {
	beforeEach(() => {
		Storage.prototype.getItem = vi.fn();
	});

	it('should return an array of recent searches', () => {
		const searches = [
			{ src: { city: 'City1' }, des: { city: 'City2' }, departDate: '2022-01-01' },
			{ src: { city: 'City3' }, des: { city: 'City4' }, departDate: '2022-01-02' },
			{ src: { city: 'City5' }, des: { city: 'City6' }, departDate: '2022-01-03' }
		];
		Storage.prototype.getItem = vi.fn().mockReturnValue(JSON.stringify(searches));
		expect(getRecentFlightSearches()).toEqual(searches);
	});

	it('should return an empty array if there are no recent searches', () => {
		Storage.prototype.getItem = vi.fn().mockReturnValue(null);
		expect(getRecentFlightSearches()).toEqual([]);
	});
});

describe('cacheRecentCitySearches', () => {
	beforeEach(() => {
		Storage.prototype.getItem = vi.fn();
		Storage.prototype.setItem = vi.fn();
	});

	it('should cache a new city search', () => {
		const city = { city: 'City1' };
		Storage.prototype.getItem = vi.fn().mockReturnValue(null);
		cacheRecentCitySearches(city as any);
		expect(localStorage.setItem).toHaveBeenCalledWith('recentCitySearches', JSON.stringify([city]));
	});

	it('should not cache a duplicate city search', () => {
		const city = { city: 'City1' };
		Storage.prototype.getItem = vi.fn().mockReturnValue(JSON.stringify([city]));
		cacheRecentCitySearches(city as any);
		expect(localStorage.setItem).not.toHaveBeenCalled();
	});

	it('should remove the oldest city search when there are already three city searches', () => {
		const city1 = { city: 'City1' };
		const city2 = { city: 'City2' };
		const city3 = { city: 'City3' };
		const newCity = { city: 'City4' };
		Storage.prototype.getItem = vi.fn().mockReturnValue(JSON.stringify([city1, city2, city3]));
		cacheRecentCitySearches(newCity as any);
		expect(localStorage.setItem).toHaveBeenCalledWith(
			'recentCitySearches',
			JSON.stringify([newCity, city1, city2])
		);
	});
});

describe('getRecentCitySearches', () => {
	beforeEach(() => {
		Storage.prototype.getItem = vi.fn();
	});

	it('should return an array of recent city searches', () => {
		const cities = [{ city: 'City1' }, { city: 'City2' }, { city: 'City3' }];
		Storage.prototype.getItem = vi.fn().mockReturnValue(JSON.stringify(cities));
		expect(getRecentCitySearches()).toEqual(cities);
	});

	it('should return an empty array if there are no recent city searches', () => {
		Storage.prototype.getItem = vi.fn().mockReturnValue(null);
		expect(getRecentCitySearches()).toEqual([]);
	});
});
