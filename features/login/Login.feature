Feature: Visit

    Scenario: Visit the page
        Given User is on home page
        When User login with 'admin' role credentials
        Then search something
        When logout the facebook page
        When User login with 'admin_2' role credentials
        When logout the facebook page
        

        
#         Then Dashboard for 'admin' role should be shown