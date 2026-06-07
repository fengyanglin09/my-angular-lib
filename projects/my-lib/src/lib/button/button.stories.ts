import { Meta, moduleMetadata, StoryObj } from '@storybook/angular';
import { Button } from './button';

const meta: Meta<Button> = {
  title: 'My Lib/Button',
  component: Button,
  decorators: [
    moduleMetadata({
      imports: [
        // any standalone dependencies used by the template
      ],
      providers: [
        // optional providers
      ],
    }),
  ],
  tags: ['autodocs'],
  args: {
    // put default @Input values here, for example:
    // label: 'Click me'
    label: 'Click me',
    variant: 'primary',
    disabled: false,
  },
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['primary', 'secondary'], // add all your variants here
    },
    disabled: {
      control: { type: 'boolean' },
    }
  },
};

export default meta;

type Story = StoryObj<Button>;

export const Default: Story = {};


// export const Disabled: Story = {
//   args: {
//     label: 'Disabled button',
//     disabled: true,
//   },
// };

export const Save: Story = {
  args: {
    label: 'Save',
  },
};


export const Secondary: Story = {
  args: {
    variant: 'secondary'
  },

};

export const Disabled: Story = {
  args: {
    variant: 'primary',
    disabled: true
  },
};
