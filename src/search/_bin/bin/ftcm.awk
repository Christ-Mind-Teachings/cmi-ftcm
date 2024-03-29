#
# if we find the regex then we keep the one line paragraph
# - indicated this by returning 0
#
# return 1 if we want to discard the paragraph
#
function discardParagraph(p) {
  if (n = match(p,/[Yy]es/) > 0) {
    return 1
  }
  if (n = match(p,/^[Aa]men/) > 0) {
    return 2
  }
  if (n = match(p,/[Tt]eraz zaczynamy\.$/) > 0) {
    return 3
  }
  if (n = match(p,/^[Jj]ayem/) > 0) {
    return 3
  }
  if (n = match(p,/[Pp]ytania i odpowiedzi/) > 0) {
    return 3
  }
  if (n = match(p,/^[Nn]o$/) > 0) {
    return 4
  }
  if (n = match(p,/hmm/) > 0) {
    return 5
  }
  if (n = match(p,/[Th]ank you/) > 0) {
    return 6
  }
  if (n = match(p,/[Ii]ndeed/) > 0) {
    return 7
  }
  if (n = match(p,/[Nn]o.*questions/) > 0) {
    return 8
  }
  if (n = match(p,/[Aa]udience/) > 0) {
    return 9
  }
  if (n = match(p,/how.*you.*doing/) > 0) {
    return 10
  }
  # one line paragraph contain the word 'laughter'
  if ((n = match(p,/[Ll]aughter/)) > 0) {
    return 11
  }
  if ((n = match(p,/[Yy]es it does/)) > 0) {
    return 12
  }

  return 0
}

BEGIN {
  i = 0
  p = 0
  l = -1
  omit = 0
  fm = 0
  inp = false
  needComma = "n"

  printf "{\n  \"source\": \"%s\",\n  \"book\": \"%s\",\n  \"unit\": \"%s\",\n", source, book, unit
  printf "  \"paragraph\": [\n"
}
/---/ {
  if (fm == 0) {
    fm = 1
  }
  else if (fm == 1) {
    fm = 2
  }
  next
}
/Track/ {
  getline tmp
  next
}
$1 ~ /#/ {
  # questions
  next
}
# horizontal line
/^<hr/ {
  next
}
# a markdown class designation
/^{:/ {
  # omit = 1
  next
}
# opening or closing div
/^<div/ || /^<\/div/ {
  next
}
/^$/ || /^>$/ || /^>\s*$/ {

  # discard paragraphs when omit is true
  if (omit == 1) {
    l = -1
    text = ""
    delete lines
    p++
    omit = 0
    next
  }

  if (l > -1) {
    len = length(lines)
    discard = 0
    if (len == 1) {
      discard = discardParagraph(lines[0])
    }
    printf "  %s{\n", needComma == "y" ? "," : ""
    printf "    \"discard\": %u,\n", discard
    printf "    \"pid\": %s,\n", p
    for (line in lines) {
      raw = lines[line]
      # remove html elements
      gsub(/\&hellip;/, "", raw)
      gsub(/ \&ndash; /, "", raw)
      gsub(/\&ndash;/, " ", raw)
      gsub(/ \&mdash; /, "", raw)
      gsub(/\&mdash;/, " ", raw)
      gsub(/\&ldquo;/, "", raw)
      gsub(/\&rdquo;/, "", raw)
      gsub(/\&lsquo;/, "", raw)
      gsub(/\&rsquo;/, "", raw)
      # remove <br/> 
      gsub(/<br\/>/,"",raw)
      gsub(/<br>/,"",raw)
      # remove <p></p> 
      gsub(/<\/?p[^>]*>/,"",raw)
      # remove <span></span> 
      gsub(/<\/?span[^>]*>/,"",raw)
      # remove punctuation
      gsub(/[\[\])(*>.,!?;:’'"“”„–/\\]/,"",raw)
      #remove 0xa0
      gsub(/ /,"",raw)
      # convert dash to space 
      gsub(/[-—]/," ",raw)
      text = sprintf("%s %s", text, raw)
    }
    # remove \%u200a
    gsub(/ /, "", text)
    # remove leading space
    gsub(/^ */, "", text)
    # collapse two spaces into one
    gsub(/  */," ",text)
    # remove underscores - text bracketed by __xxx__ are bolded by markdown
    gsub(/__/,"",text)
    printf "    \"text\": \"%s\"\n  }\n", tolower(text)
    l = -1
    text = ""
    delete lines
    needComma = "y"
    p++
  }
  next
}
{
  # only interested in lines after front matter (fm) removed
  # - that's when fm=2
  if (fm == 2) {
    l++
    lines[l] = $0
  }
}
END {
  printf "]}\n"
}

