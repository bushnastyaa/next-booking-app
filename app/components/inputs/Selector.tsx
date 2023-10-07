import { Fragment } from 'react'
import { Listbox, Transition } from '@headlessui/react'
import { HiCheck } from 'react-icons/hi'

interface SelectorProps {
  value: string;
  onChange: (value: string) => void;
}

const countries = ['Georgia', 'Spain', 'Turkey', 'Greece', 'Estonia', 'Indonesia']

const Selector = ({ value, onChange }: SelectorProps) => {

  return (
    <div className="top-16">
      <Listbox value={value} onChange={onChange}>
        <Listbox.Button className="flex flex-col w-full">
          <span className="text-gray-400 text-sm">{value}</span> 
        </Listbox.Button>
        <Transition
          as={Fragment}
          leave="transition ease-in duration-100"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <Listbox.Options className="absolute mt-1 overflow-auto rounded-md 
          bg-white py-1 shadow-lg w-[250px] z-10">
            {countries.map((country, countryIdx) => (
              <Listbox.Option
                key={countryIdx}
                className={({ active }) =>
                  `relative cursor-default select-none py-2.5 px-4 text-base ${
                    active ? 'bg-teal-100 text-gray-900' : 'text-black'
                  }`
                }
                value={country}
              >
                {({ selected }) => (
                  <>
                    <span
                      className={`block truncate ${
                        selected ? 'font-medium' : 'font-normal'
                      }`}
                    >
                      {country}
                    </span>
                  </>
                )}
              </Listbox.Option>
            ))}
          </Listbox.Options>
        </Transition>
      </Listbox>
    </div>
  )
};

export default Selector;
