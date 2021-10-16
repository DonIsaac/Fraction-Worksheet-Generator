// Jest-dom adds custom jest matchers for asserting on DOM nodes.
// Allows you to do things like:
// Expect(element).toHaveTextContent(/react/i)
// Learn more: https://github.com/testing-library/jest-dom
import "@testing-library/jest-dom"
import "seedrandom"

// Mock window's local storage
const localStorageMock = (function createLocalStorageMock() {
    let store: Record<string, string> = {}
    return {
        getItem: jest.fn<string | null, Parameters<Storage["getItem"]>>(
            key => {
                return store[key]
            }),

        setItem: jest.fn<void, Parameters<Storage["setItem"]>>(
            (key, value) => {
                store[key] = value.toString()
            }),

        clear: jest.fn(
            () => {
                store = {}
            }),

        removeItem: jest.fn<void, Parameters<Storage["removeItem"]>>(
            key => {
                delete store[key]
            }),

        get length() {
            return Object.keys(store).length
        },

        key: jest.fn(
            i => {
                return Object.keys(store)[i]
            }
        ),
    } as Storage
})()
Object.defineProperty(window, "localStorage", { value: localStorageMock })
