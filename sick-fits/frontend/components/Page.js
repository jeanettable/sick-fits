import PropTypes from 'prop-types';
import Header from './Header';

export default function Page(props) {
  const { children, cool } = props;
  return (
    <div>
      <Header />
      <h4>{cool}</h4>
      <h2>I am the Page component.</h2>
      {children}
    </div>
  );
}

Page.propTypes = {
  cool: PropTypes.string,
  children: PropTypes.oneOf([       // or PropTypes.any
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
};
