import { useState } from 'react';
import { useInput } from '../hooks/useInput';

export default function Signup() {
    const [passNotEqual, setPassNotEqual] = useState(false);
    // Just a sample of custom hook to be used for inputs
    //  can assign value alias as default value for field
    //  can assign handles to field
    // const {
    //     value: emaiLValue,
    //     handleInputChange: handleEmailChange,
    //     handleInputBlure: handleEmailBlur,
    //     hasError: hasEmailError
    // } = useInput('', (value) => {
    /*  
        validation code here as a validator fn for the custom hook
        or use a defined function without parans and value will be 
        added in the custom hook if set up correctly
    */
    //});

    // there are react form libs out there

    function handleSubmit(e) {
        e.preventDefault();
        const fd = new FormData(e.target);
        const data = Object.fromEntries(fd.entries());

        data['acquisition'] = fd.getAll('acquisition');

        //need validation, can do it many ways
        // input onChange 2 way binding
        // onSubmit 
        // onBlur
        // field level built-ins
        // just need state managers for this.
        // can write separate file for validation wrappers

        console.log(data);

        //e.target.reset();   Alternate to type="reset" button
        //do we want to clear on submission?

        if (data.password !== data['confirm-password']) {
            setPassNotEqual(true);
            return;
        }

    }

    return (
        <form onSubmit={handleSubmit}>
            <h2>Welcome on board!</h2>
            <p>We just need a little bit of data from you to get you started 🚀</p>

            <div className="control">
                <label htmlFor="email">Email</label>
                <input
                    id="email"
                    type="email"
                    name="email"
                    required
                />
            </div>
            <div className="control-row">
                <div className="control">
                    <label htmlFor="password">Password</label>
                    <input
                        id="password"
                        type="password"
                        name="password"
                        minLength={8}
                        required
                    />
                </div>
                <div className="control">
                    <label htmlFor="confirm-password">Confirm Password</label>
                    <input
                        id="confirm-password"
                        type="password"
                        name="confirm-password"
                        minLength={8}
                        required
                    />
                    {
                        passNotEqual && <div className="control-error"><p>Passwords must match.</p></div>
                    }
                </div>
            </div>

            <hr />

            <div className="control-row">
                <div className="control">
                    <label htmlFor="first-name">First Name</label>
                    <input
                        type="text"
                        id="first-name"
                        name="first-name"
                        required
                    />
                </div>
                <div className="control">
                    <label htmlFor="last-name">Last Name</label>
                    <input
                        type="text"
                        id="last-name"
                        name="last-name"
                        required
                    />
                </div>
            </div>

            <div className="control">
                <label htmlFor="phone">What best describes your role?</label>
                <select id="role" name="role">
                    <option value="student">Student</option>
                    <option value="teacher">Teacher</option>
                    <option value="employee">Employee</option>
                    <option value="founder">Founder</option>
                    <option value="other">Other</option>
                </select>
            </div>

            <fieldset>
                <legend>How did you find us?</legend>
                <div className="control">
                    <input
                        type="checkbox"
                        id="google"
                        name="acquisition"
                        value="google"
                    />
                    <label htmlFor="google">Google</label>
                </div>

                <div className="control">
                    <input
                        type="checkbox"
                        id="friend"
                        name="acquisition"
                        value="friend"
                    />
                    <label htmlFor="friend">Referred by friend</label>
                </div>

                <div className="control">
                    <input
                        type="checkbox"
                        id="other"
                        name="acquisition"
                        value="other"
                    />
                    <label htmlFor="other">Other</label>
                </div>
            </fieldset>

            <div className="control">
                <label htmlFor="terms-and-conditions">
                    <input
                        type="checkbox"
                        id="terms-and-conditions"
                        name="terms"
                        required
                    />I
                    agree to the terms and conditions
                </label>
            </div>

            <p className="form-actions">
                <button type="reset" className="button button-flat">
                    Reset
                </button>
                <button type="submit" className="button">
                    Sign up
                </button>
            </p>
        </form>
    );
}