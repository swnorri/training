import classes from './Notification.module.css';

export default  function Notification(props){
    const { status, title, message } = props;
    let specialClasses = '';

    switch(status){
        case 'error' :{
            specialClasses = classes.error;
            break;
        }
        case 'success' :{
            specialClasses = classes.success;
            break;
        }
    }

    const cssClasses = `${classes.notification} ${specialClasses}`;

    return (
        <section className={cssClasses}>
            <h2>{title}</h2>
            <p>{message}</p>
        </section>
    )
};
