import getEnvVar from '../src';


describe('@bolajiolajide/env-utils', () => {
  const OLD_ENV = process.env;
  const NEW_VARS = {
    TEST_STR_VAR: 'sample',
    TEST_ARR_VAR: 'cat,cow,mouse,dog',
    TEST_ARR_VAR_2: 'cat cow mouse dog',
    TEST_NUM_VAR: '23',
    TEST_BOOL_VAR: 'true',
    TEST_BOOL_VAR_2: 'something else',
  }

  describe('development environment', () => {
    beforeEach(() => {
      jest.resetModules() // Most important - it clears the cache
      process.env = {
        ...NEW_VARS,
        NODE_ENV: 'development'
      }; // Make a copy
    });

    afterAll(() => {
      process.env = OLD_ENV; // Restore old environment
    });

    test('throws an error if the key does not exist and there\'s no devDefault', (done) => {
      expect(() => getEnvVar('UNDEFINED_KEY')).toThrowError('key: "UNDEFINED_KEY" is undefined');

      done();
    });

    test('returns undefined is key is optional and env is undefined', (done) => {
      const envVar = getEnvVar('UNDEFINED_KEY', { optional: true });

      expect(envVar).toBeUndefined();
      done();
    });

    test('returns devDefault if env is undefined and devDefault is true', (done) => {
      const envVar = getEnvVar('UNDEFINED_KEY', { devDefault: 'I AM DEFINED' });

      expect(envVar).toBeDefined();
      expect(envVar).toEqual('I AM DEFINED');
      done();
    });

    test('returns a true boolean if `isBoolean` is true and the string === `true`', (done) => {
      const envVar = getEnvVar('TEST_BOOL_VAR', { isBoolean: true });

      expect(envVar).toBe(true);
      done();
    });

    test('returns a falsy boolean if `isBoolean` is true and the string !== `true`', (done) => {
      const envVar = getEnvVar('TEST_BOOL_VAR_2', { isBoolean: true });

      expect(envVar).toBe(false);
      done();
    });

    test('returns actual envValue if it\'s defined, even if devDefault has been set', (done) => {
      const envVar = getEnvVar('TEST_STR_VAR', { devDefault: 'Something something' });

      expect(envVar).toEqual(NEW_VARS.TEST_STR_VAR);
      done();
    });

    test('returns an array if envValue is a string and isArray is true', (done) => {
      const envVar = getEnvVar('TEST_ARR_VAR', { isArray: true });

      expect(envVar).toEqual(['cat' ,'cow', 'mouse', 'dog']);
      done();
    });

    test('returns an array if envValue is a string and isArray is true and separator is defined', (done) => {
      const envVar = getEnvVar('TEST_ARR_VAR_2', { isArray: true, separator: ' ' });

      expect(envVar).toEqual(['cat' ,'cow', 'mouse', 'dog']);
      done();
    });

    test('returns number if `isNumber` is true', (done) => {
      const envVar = getEnvVar('TEST_NUM_VAR', { isNumber: true });

      expect(envVar).toEqual(23);
      done();
    });

    test('throws an error is `isNumber` is true and envValue is not a number', (done) => {
      const errorEnvVar = () => getEnvVar('TEST_STR_VAR', { isNumber: true });

      expect(errorEnvVar).toThrowError('key: "TEST_STR_VAR" is not a valid number');
      done();
    });
  });

  describe('non-development environment', () => {
    beforeEach(() => {
      jest.resetModules() // Most important - it clears the cache
      process.env = {
        ...OLD_ENV,
        ...NEW_VARS,
        NODE_ENV: 'production'
      }; // Make a copy
    });

    afterAll(() => {
      process.env = OLD_ENV; // Restore old environment
    });

    test('throws an error if the key does not exist and there\'s no devDefault', (done) => {
      expect(() => getEnvVar('UNDEFINED_KEY')).toThrowError('key: "UNDEFINED_KEY" is undefined');

      done();
    });

    test('throws an error if the key does not exist and there\'s devDefault', (done) => {
      expect(() => getEnvVar('UNDEFINED_KEY', { devDefault: 'stuff' })).toThrowError('key: "UNDEFINED_KEY" is undefined');

      done();
    });
  });
});
