public class ContactSelector {
 public static List<Contact> getContacts(String email){
        String query = 'SELECT Id, Name FROM Contact WHERE Email =\''+email + '\'';
        List<Contact> result = Database.query(String.valueof(query));
        System.debug(result);
        return result;
    }
}