const Search = {
    init: function() {
        setInterval(() => {
            if (location.href.includes('www.netflix.com/browse') &&
                !$('#wp-search-dropdown')[0]) 
            {
                this.initUI();
            }
        }, 1000);
    },
    initUI: function() {
        const dropDown = this.createDropdown();
        $('.tabbed-primary-navigation').append(dropDown);
    },
    styleOuter: function(dropdown) {
        dropdown.style.position  = "absolute";
        const width              = $('.tabbed-primary-navigation').outerWidth();
        const height             = $('.tabbed-primary-navigation').outerHeight();
        dropdown.style.left      = width * 1.475 + "px";
        dropdown.style.top       = height / 2.85 + "px";
        dropdown.style.minHeight = "40vw";
        dropdown.style.minWidth  = "25vw";
        return dropdown;
    },
    styleInner: function(listDiv) {
        const top                     = $('.tabbed-primary-navigation').height();
        listDiv.style.marginTop       = top / 1.5 +"px";
        listDiv.style.maxHeight       = "30vw";
        listDiv.style.minWidth        = "21.5vw";
        listDiv.style.backgroundColor = "rgba(4,4,4,.74)";
        listDiv.style.overflowY       = "auto";
        listDiv.style.overflowX       = "hidden";
        listDiv.style.fontSize        = "17px";
        listDiv.style.display         = "none";
        listDiv.style.border          = "none";
        return listDiv
    },
    createButton: function() {
        const btn            = document.createElement("Button")
        const text           = document.createTextNode("Reveal");
        btn.id               = 'revealBtn';
        btn.style.position   ="fixed";
        btn.style.fontSize   = "17px";
        btn.style.fontStyle  = "bold";
        btn.style.color      = "#ABACAC";
        btn.style.border     = "none";
        btn.style.background = "Transparent";
        btn.appendChild(text);
        return btn;
    },
    filterSearch: function() {
        let input, filter, a, i;

        input  = document.getElementById("categoryInput");
        filter = input.value.toUpperCase();
        div    = document.getElementById("dropDown");
        a      = div.getElementsByTagName("a");

        for (i = 0; i < a.length; i++) {//loop through each a tag
            if (a[i].innerHTML.toUpperCase().indexOf(filter) > -1) {//change display of <a> tag if it matches input field search term
                a[i].style.display = "block";
            } else {
                a[i].style.display = "none";
            }
        }
    },
    createInput: function() {
        const input              = document.createElement("input");
        input.id                 = "categoryInput"
        input.type               = "text";
        input.style.position     = "fixed";
        input.placeholder        = "Search";
        input.style.display      = "none";
        input.style.fontSize     = "17px";
        input.style.borderRadius = "1px";
        input.style.background   = "Transparent";
        input.style.border       = "solid rgba(250,250,250,.9) .5px";
        input.style.margin       = "0 0 0 1vw"
        input.style.minHeight    = "1.5vw";
        input.style.width        = "0px";
        input.onkeyup            = this.filterSearch;
        return input;
    },
    createLink: function(link, category) {
        const a        = document.createElement('a');
        const linkText = document.createTextNode(category+'\n');

        a.appendChild(linkText);
        
        a.style.display = "block";
        a.style.margin  = ".2vw 1vw 0 .4vw"
        a.style.padding = ".1vw 0 .2vw .5vw";
        a.tagName       = "a";
        a.href          = "http://www.netflix.com/browse/genre/"+link;

        $(a).on('mouseenter',function(){
            $(this).css('background-color','rgba(255,255,255,.2)');
        });
        $(a).on('mouseleave',function(){
            $(this).css('background-color','transparent');
        });
        return a;
    },
    splitCategory: function(line) {
        const regExp   =  /^(\S+)\s(.+)$/; //regex to seperate category number and corresponding name
        let match      = null;
        const trimLine = line.replace(/ +/, ""); //trim leading whitespace

        if((match = regExp.exec(trimLine)) !== null){
            if(match.index === regExp.lastIndex){
                regExp.lastIndex++;
            }
        }
        return match;
    },
    populateDropdown: function() {
        const xhr     = new XMLHttpRequest();
        const listDiv = document.createElement("div");
        listDiv.id    = "categoryDiv";

        xhr.open('GET', chrome.extension.getURL('resources/categories.txt'), true);
        xhr.onreadystatechange = () => {
            if(xhr.readyState == XMLHttpRequest.DONE && xhr.status == 200)
            {
                const lines = xhr.responseText.split('\n');//create array of all categories in document
                let categoryLink = null;
                let categoryName = null;
                for(let line = 0; line< lines.length;line++){
                    categoryLink = this.splitCategory(lines[line])[1];
                    categoryName = this.splitCategory(lines[line])[2];
                    listDiv.appendChild(this.createLink(categoryLink, categoryName));
                }
            }
        };
        xhr.send();
        return this.styleInner(listDiv);
    },
    animateDropdown: function(outerDiv, btn) {
        $(btn).on('mouseenter', function(){
            const offset = $('#revealBtn').offset().left;
            const width  = $('#revealBtn').width();
            $('#revealBtn').css({color : 'white'});
            $('#categoryInput').css({left: offset+width})//position input field next to button
            $('#categoryDiv').slideDown(500);
            $('#categoryInput').css({display:'block',background:'black'});
            $('#categoryInput').animate({width:'18vw'}, 500);
        });
        $(outerDiv).on('mouseleave', function(){
            $('#categoryDiv').slideUp(500);
            $('#categoryInput').animate({width:'0vw'}, 500);
            $('#revealBtn').css({ color: '#ABACAC'});
            setTimeout(function(){//hide input field after slide animation is done
                $('#categoryInput').css({display:'none', background:'transparent'})
            },500);
        });
    },
    createDropdown: function() {
        const btn    = this.createButton();
        const input  = this.createInput();
        let outerDiv = document.createElement("div");
        outerDiv.id  = "wp-search-dropdown";
        outerDiv.appendChild(btn);
        outerDiv.appendChild(input);
        outerDiv.appendChild(this.populateDropdown());
        outerDiv     = this.styleOuter(outerDiv);
        this.animateDropdown(outerDiv, btn);
        return outerDiv;
    },
};