import { Component } from 'react';
import ContactForm from './ContactForm';
import ContactList from './ContactList';
import Filter from './Filter';
import { nanoid } from 'nanoid';

class App extends Component {
  state = {
    contacts: [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
    filter: '',
  };
  addContact = newContact => {
    const { contacts } = this.state;
    const contactItem = {
      id: nanoid(),
      name: newContact.name,
      number: newContact.number,
    };
    if (
      contacts
        .map(contact => contact.name.toLowerCase())
        .includes(newContact.name.toLowerCase())
    ) {
      alert(`${newContact.name} is already in contacts`);
    } else {
      this.setState(prevState => ({
        contacts: [contactItem, ...prevState.contacts],
      }));
    }
  };
  removeContact = id => {
    this.setState(({ contacts }) => {
      return {
        contacts: contacts.filter(e => e.id !== id),
      };
    });
  };

  // filtercontact = () => {
  //   const { filter, contacts } = this.state;
  //   const filterLowerCase = filter.toLowerCase();

  //   return contacts.filter(contact =>
  //     contact.name.toLowerCase().includes(filterLowerCase)
  //   );
  // };
  // changeFilter = e => {
  //   this.setState({ filter: e.currentTarget.value });
  // };

  handleFilter = ({ target }) => {
    this.setState({
      filter: target.value,
    });
  };

  getFilteredContact = () => {
    const { filter, contacts } = this.state;
    if (!filter) {
      return contacts;
    }
    const filterValue = filter.toLowerCase();
    const filterContact = contacts.filter(({ name }) => {
      const nameContact = name.toLowerCase();
      return nameContact.includes(filterValue);
    });
    return filterContact;
  };

  render() {
    return (
      <div>
        <h1>Phonebook</h1>
        <ContactForm onSubmit={this.addContact} />

        <h2>Contacts</h2>
        <Filter value={this.state.filter} onChange={this.handleFilter} />
        <ContactList
          contacts={this.getFilteredContact()}
          removeContact={this.removeContact}
        />
      </div>
    );
  }
}

export default App;
